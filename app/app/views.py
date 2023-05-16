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
from langchain.llms import OpenAI
from langchain.chains.question_answering import load_qa_chain


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
    llm = OpenAI(temperature=0, openai_api_key=os.getenv('OPENAI_API_KEY'))
    chain = load_qa_chain(llm, chain_type="stuff")
    docsearch = Pinecone.from_existing_index("queryx", embeddings)
    docs = docsearch.similarity_search(queryText)
    output = chain.run(input_documents = docs, question = queryText)
    return HttpResponse(json.dumps({
        'Message': 'Success',
        'Result': output
    }))
