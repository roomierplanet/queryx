from django.shortcuts import render
from django.http import HttpResponse
import json
from langchain.embeddings.openai import OpenAIEmbeddings
import os
from langchain.text_splitter import CharacterTextSplitter
from langchain.document_loaders import DirectoryLoader
from langchain.vectorstores import Pinecone
import pinecone
from dotenv import load_dotenv
from django.views.decorators.csrf import csrf_exempt
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory

load_dotenv()
pinecone.init(
    api_key=os.getenv('PINECONE_API_KEY'), 
    environment=os.getenv('PINECONE_ENV') 
    )


def update(request):
    
    index = pinecone.Index("queryx")
    index.delete(deleteAll=True)
    loader = DirectoryLoader(os.getcwd()[:-3] + 'YourDocs')
    docs = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    texts = text_splitter.split_documents(docs)
    embeddings = OpenAIEmbeddings(openai_api_key=os.getenv('OPENAI_API_KEY'))
    Pinecone.from_documents([text for text in texts], embeddings, index_name = "queryx")
    return HttpResponse(json.dumps({
        'Message': 'Success'
    }))

@csrf_exempt 
def query(request):
    req_body = request.body.decode('utf-8')
    body = json.loads(req_body)
    queryText = body['queryText']
    embeddings = OpenAIEmbeddings(openai_api_key=os.getenv('OPENAI_API_KEY'))
    docsearch = Pinecone.from_existing_index("queryx", embeddings)
    llm = ChatOpenAI(temperature=0, model_name='gpt-3.5-turbo',openai_api_key=os.getenv('OPENAI_API_KEY'))
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    chain = ConversationalRetrievalChain.from_llm(llm, docsearch.as_retriever(), memory=memory)
    result = chain({"question": queryText})
    return HttpResponse(json.dumps({
        'message': 'success',
        'result': result["answer"]
    }))
