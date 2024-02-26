---
title: "Syntax Highlighting"
subtitle: "in Code Blocks"
subheading: "Share code snippets with syntax highlighting"
isVisible: true
hideContent: false
image: ""
imagePositionX: 50
imagePositionY: 50
showImageInHeader: true
weight: 50
date: 2024-01-13T20:01:16
author: ""
snippet: "Writing a technical blog? Need to share code snippets? Eggspress can breathe life into your code blocks with syntax highlighting."
description: "Writing a technical blog? Need to share code snippets? Here's how to use syntax highlighting in your code blocks."
sidebar: "eggspress_links"
category: ""
prevPost: ""
nextPost: ""
relatedPost1: "editing-content"
relatedPost2: ""
relatedPost3: ""
relatedPost4: ""
relatedPost5: ""
relatedPost6: ""
relatedPost7: ""
relatedPost8: ""
relatedPost9: ""
---

Need to share a code snippet? Eggspress integrates [highlight.js](https://highlightjs.org/), a library that applies syntax highlighting to your code blocks.

Code blocks are highlighted in different themes depending on whether dark mode is toggled.

In light mode, Eggspress uses `stackoverflow-light`. In dark mode, `github-dark`.

![](my_posts/guide/images/code.jpg)

## How to create a code block
You can create code blocks in your Markdown content. To do so, wrap any number of lines of code in between a set of three backticks (the "\`" character).

To apply syntax highlighting, you must specify the language used inside of the code block. This can be done by appending the name of the language immediately following the first set of backticks.

Here are some examples of how you might write code blocks in your content.

````markdown
```python
def greet(name):
    print(f"Hello, {name}!")

person = "World"
greet(person)
```
````

````markdown
```java
public class Greeting {
    public static void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }

    public static void main(String[] args) {
        String person = "World";
        greet(person);
    }
}
```
````

You may also use an [alias](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md) to specify your language. In the example below, we specify our language as "js" instead of "javascript."

````markdown
```js
function greet(name) {
  console.log("Hello, " + name + "!");
}

let person = "World";
greet(person);
```
````

## Which languages are supported?
Eggspress supports all 192 languages available through highlight.js. For a complete list of languages, see [Supported Languages](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md).

## Hello, World!
The following are "Hello, world!" code snippets in various languages. These demonstrate how your code blocks may appear with syntax highlighting.

C++

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```

Python

```python
print("Hello, world!")
```

JavaScript
```js
console.log('Hello, world!');
```

TypeScript
```ts
let message: string = 'Hello, World!';
console.log(message);
```

HTML
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello, World!</title>
  </head>
  <body>
    <h1>Hello, world!</h1>  
  </body>
</html>
```

Kotlin
```kotlin
fun main() {
   println("Hello World!")
}
```

SQL
```sql
 CREATE TABLE message (text char(15));
 INSERT INTO message (text) VALUES ('Hello, world!');
 SELECT text FROM message;
 DROP TABLE message;
 ```

Rust
```rust
fn main() {
    println!("Hello, world!");
}
```

Go
```go
package main

import "fmt"

func main() {
  fmt.Println("Hello, world!")
}
```

Fortran
```fortran
PROGRAM HelloWorld
  WRITE(*, *) 'Hello, world!'
END PROGRAM HelloWorld
```

Excel
```excel
="Hello, world!"
```

Stata
```stata
 capture program drop hello /*Define Hello, world! program*/
 program define hello   
      di "Hello, world!"
 end
 
 hello  /*run Hello, world! program*/
```

x86 Assembly

```x86asm
; FASM example of writing 16-bit DOS .COM program
; Compile: "FASM HELLO.ASM HELLO.COM" 
  org  $100
  use16    
  mov  ah,9
  mov  dx,xhello
  int  $21    ; DOS call: text output
  mov  ah,$4C
  int  $21    ; Return to DOS
xhello db 'Hello world !!!$'
```