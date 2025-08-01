export const defaultSnippets = [
  {
    name: 'javascript',
    code: `// JavaScript Example
function greet(name) {
  console.log("Hello, " + name);
}
greet("World");`
  },
  {
    name: 'typescript',
    code: `// TypeScript Example
function greet(name: string): void {
  console.log("Hello, " + name);
}
greet("World");`
  },
  {
    name: 'python',
    code: `# Python Example
def greet(name):
    print("Hello, " + name)

greet("World")`
  },
  {
    name: 'java',
    code: `// Java Example
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World");
  }
}`
  },
  {
    name: 'csharp',
    code: `// C# Example
using System;

class Program {
  static void Main() {
    Console.WriteLine("Hello, World");
  }
}`
  },
  {
    name: 'php',
    code: `// PHP Example
<?php
echo "Hello, World";
?>`
  },
  
];




export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
};

export const CODE_SNIPPETS = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$name = 'Alex';\necho $name;\n",
};
