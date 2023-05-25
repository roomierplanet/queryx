import React from 'react'
import { CodeBlock, nord } from "react-code-blocks";

export default function ChatMessage(props) {
    const content = props.message
    const idx = props.idx
    const blocks = content.split("```")
    const langs = ["abap", "actionscript", "ada", "arduino", "autoit", "c", "clojure", "cs", "c", "cpp", "coffeescript", "csharp", "css", "cuda", "d", "dart", "delphi", "elixir", "elm", "erlang", "fortran", "foxpro", "fsharp", "go", "graphql", "gql", "groovy", "haskell", "haxe", "html", "java", "javascript", "json", "julia", "jsx", "js", "kotlin", "latex", "lisp", "livescript", "lua", "mathematica", "makefile", "matlab", "objectivec", "objective", "objective", "objectpascal", "ocaml", "octave", "perl", "php", "powershell", "prolog", "puppet", "python", "qml", "r", "racket", "restructuredtext", "rest", "ruby", "rust", "sass", "less", "scala", "scheme", "shell", "smalltalk", "sql", "standardmlyam", "sml", "swift", "tcl", "tex", "text", "tsx", "ts", "typescript", "vala", "vbnet", "verilog", "vhdl", "xml", "xquery", "yaml"]
    const words = content.split(" ")
    let language = "C++"
    for(let word of words) {
        if (langs.includes(word.toLowerCase())) {
            language = word
        }
    }
    if (blocks.length === 1 && idx % 2 === 1 && blocks[0].substring(0, 4) === "```") {
        return (
            <div className="chat-message" id={idx % 2 === 0 ? 'user' : 'gpt'}>
                <CodeBlock
                    text={content}
                    showLineNumbers={true}
                    startingLineNumber={1}
                    theme={nord}
                    language={language}
                    wrapLines
                />
            </div>
        )
    } else {
        return (
            <div className="chat-message" id={idx % 2 === 0 ? 'user' : 'gpt'}>
                {blocks.map((msg, i) => {
                    if (i % 2 === 0) {
                        return (<p>{msg}</p>)
                    } else {
                        return (<CodeBlock
                                    text={msg}
                                    showLineNumbers={true}
                                    startingLineNumber={1}
                                    language={language}
                                    theme={nord}
                                    wrapLines />)
                    }
                })}
            </div>
        )
    }
}
