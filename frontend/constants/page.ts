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
    name: 'cpp',
    code: `// C++ Example
#include <iostream>
using namespace std;

int main() {
  cout << "Hello, World" << endl;
  return 0;
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
    name: 'go',
    code: `// Go Example
package main

import "fmt"

func main() {
  fmt.Println("Hello, World")
}`
  },
  {
    name: 'rust',
    code: `// Rust Example
fn main() {
  println!("Hello, World");
}`
  },
  {
    name: 'php',
    code: `// PHP Example
<?php
echo "Hello, World";
?>`
  },
  {
    name: 'ruby',
    code: `# Ruby Example
def greet(name)
  puts "Hello, #{name}"
end

greet("World")`
  },
  {
    name: 'swift',
    code: `// Swift Example
import Foundation

func greet(name: String) {
  print("Hello, \\(name)")
}

greet(name: "World")`
  },
  {
    name: 'kotlin',
    code: `// Kotlin Example
fun main() {
  println("Hello, World")
}`
  }
];
