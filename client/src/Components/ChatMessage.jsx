import React from 'react'
import { CodeBlock, irBlack } from "react-code-blocks";
import { useLinkClickHandler } from 'react-router-dom';

export default function ChatMessage(props) {
    const content = props.message
    const idx = props.idx
    const blocks = content.split("```")
    const langs = ["abap", "actionscript", "ada", "arduino", "autoit", "c", "clojure", "cs", "c", "cpp", "coffeescript", "csharp", "css", "cuda", "d", "dart", "delphi", "elixir", "elm", "erlang", "fortran", "foxpro", "fsharp", "go", "graphql", "gql", "groovy", "haskell", "haxe", "html", "java", "javascript", "json", "julia", "jsx", "js", "kotlin", "latex", "lisp", "livescript", "lua", "mathematica", "makefile", "matlab", "objectivec", "objective", "objective", "objectpascal", "ocaml", "octave", "perl", "php", "powershell", "prolog", "puppet", "python", "qml", "r", "racket", "restructuredtext", "rest", "ruby", "rust", "sass", "less", "scala", "scheme", "shell", "smalltalk", "sql", "standardmlyam", "sml", "swift", "tcl", "tex", "text", "tsx", "ts", "typescript", "vala", "vbnet", "verilog", "vhdl", "xml", "xquery", "yaml"]
    let words = content.split(" ")
    let language = "js"
    for(let word of words) {
        if (langs.includes(word.toLowerCase())) {
            language = word.toLowerCase()
        }
    }
    if (blocks.length === 1 && idx % 2 === 1 && blocks[0].substring(0, 4) === "```") {
        return (
            <div className="chat-message" id={idx % 2 === 0 ? 'user' : 'gpt'}>
                <CodeBlock
                    text={content.substring(1)}
                    theme={irBlack}
                    language={language}
                    wrapLongLines
                />
            </div>
        )
    } else {
        return (
            <div className="chat-message" id={idx % 2 === 0 ? 'user' : 'gpt'}>
                {blocks.map((msg, i) => {
                    if (i % 2 === 0) {
                        let sections = msg.split("`")
                        return (
                            <p>
                                {sections.map((s, i) => {
                                    if (i % 2 === 1) {
                                        return <b>{s}</b>
                                    } else {
                                        return s
                                    }
                                })}
                            </p>
                        )
                    } else {
                        return (<CodeBlock
                                    text={msg.substring(1)}
                                    language={language}
                                    theme={irBlack}
                                    wrapLongLines />)
                    }
                })}
            </div>
        )
    }
}
