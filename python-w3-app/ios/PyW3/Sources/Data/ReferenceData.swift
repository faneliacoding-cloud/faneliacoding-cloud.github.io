import Foundation

// MARK: - Python Reference Data

struct ReferenceData {
    static let allItems: [ReferenceItem] = [
        // Built-in Functions
        ReferenceItem(keyword: "print()", category: "Built-in Function", syntax: "print(*objects, sep=' ', end='\\n')", description: "Prints the specified message to the console.", example: "print(\"Hello\", \"World\")  # Hello World"),
        ReferenceItem(keyword: "len()", category: "Built-in Function", syntax: "len(object)", description: "Returns the number of items in an object.", example: "len([1,2,3])  # 3"),
        ReferenceItem(keyword: "type()", category: "Built-in Function", syntax: "type(object)", description: "Returns the type of an object.", example: "type(42)  # <class 'int'>"),
        ReferenceItem(keyword: "range()", category: "Built-in Function", syntax: "range(start, stop, step)", description: "Returns a sequence of numbers.", example: "list(range(5))  # [0,1,2,3,4]"),
        ReferenceItem(keyword: "input()", category: "Built-in Function", syntax: "input(prompt)", description: "Reads a line of input from the user.", example: "name = input(\"Enter name: \")"),
        ReferenceItem(keyword: "int()", category: "Built-in Function", syntax: "int(value)", description: "Converts a value to an integer.", example: "int(\"42\")  # 42"),
        ReferenceItem(keyword: "float()", category: "Built-in Function", syntax: "float(value)", description: "Converts a value to a float.", example: "float(\"3.14\")  # 3.14"),
        ReferenceItem(keyword: "str()", category: "Built-in Function", syntax: "str(object)", description: "Converts a value to a string.", example: "str(100)  # \"100\""),
        ReferenceItem(keyword: "bool()", category: "Built-in Function", syntax: "bool(value)", description: "Converts a value to a boolean.", example: "bool(0)  # False"),
        ReferenceItem(keyword: "list()", category: "Built-in Function", syntax: "list(iterable)", description: "Creates a list from an iterable.", example: "list(\"abc\")  # ['a','b','c']"),
        ReferenceItem(keyword: "dict()", category: "Built-in Function", syntax: "dict(**kwargs)", description: "Creates a dictionary.", example: "dict(a=1, b=2)  # {'a':1,'b':2}"),
        ReferenceItem(keyword: "sorted()", category: "Built-in Function", syntax: "sorted(iterable, key, reverse)", description: "Returns a sorted list.", example: "sorted([3,1,2])  # [1,2,3]"),
        ReferenceItem(keyword: "sum()", category: "Built-in Function", syntax: "sum(iterable, start=0)", description: "Returns the sum of all items.", example: "sum([1,2,3])  # 6"),
        ReferenceItem(keyword: "max()", category: "Built-in Function", syntax: "max(iterable)", description: "Returns the largest item.", example: "max([1,5,3])  # 5"),
        ReferenceItem(keyword: "min()", category: "Built-in Function", syntax: "min(iterable)", description: "Returns the smallest item.", example: "min([1,5,3])  # 1"),
        ReferenceItem(keyword: "abs()", category: "Built-in Function", syntax: "abs(number)", description: "Returns the absolute value.", example: "abs(-7)  # 7"),
        ReferenceItem(keyword: "round()", category: "Built-in Function", syntax: "round(number, ndigits)", description: "Rounds a number.", example: "round(3.14159, 2)  # 3.14"),
        ReferenceItem(keyword: "enumerate()", category: "Built-in Function", syntax: "enumerate(iterable, start=0)", description: "Returns index and value pairs.", example: "list(enumerate(['a','b']))  # [(0,'a'),(1,'b')]"),
        ReferenceItem(keyword: "zip()", category: "Built-in Function", syntax: "zip(*iterables)", description: "Pairs elements from multiple iterables.", example: "list(zip([1,2],['a','b']))  # [(1,'a'),(2,'b')]"),
        ReferenceItem(keyword: "map()", category: "Built-in Function", syntax: "map(function, iterable)", description: "Applies a function to every item.", example: "list(map(str, [1,2,3]))  # ['1','2','3']"),
        
        // Keywords
        ReferenceItem(keyword: "if", category: "Keyword", syntax: "if condition:", description: "Conditional execution of a code block.", example: "if x > 5:\n    print(\"big\")"),
        ReferenceItem(keyword: "elif", category: "Keyword", syntax: "elif condition:", description: "Additional condition in an if chain.", example: "elif x == 5:\n    print(\"five\")"),
        ReferenceItem(keyword: "else", category: "Keyword", syntax: "else:", description: "Catch-all for conditions not met above.", example: "else:\n    print(\"other\")"),
        ReferenceItem(keyword: "for", category: "Keyword", syntax: "for var in iterable:", description: "Iterates over items of a sequence.", example: "for i in range(5):\n    print(i)"),
        ReferenceItem(keyword: "while", category: "Keyword", syntax: "while condition:", description: "Repeats a block while condition is true.", example: "while x < 10:\n    x += 1"),
        ReferenceItem(keyword: "def", category: "Keyword", syntax: "def name(params):", description: "Defines a function.", example: "def greet(name):\n    print(f\"Hi {name}\")"),
        ReferenceItem(keyword: "return", category: "Keyword", syntax: "return value", description: "Returns a value from a function.", example: "return x + y"),
        ReferenceItem(keyword: "lambda", category: "Keyword", syntax: "lambda args: expression", description: "Creates an anonymous function.", example: "double = lambda x: x * 2"),
        ReferenceItem(keyword: "class", category: "Keyword", syntax: "class Name:", description: "Defines a class.", example: "class Dog:\n    def bark(self):\n        print(\"Woof!\")"),
        ReferenceItem(keyword: "import", category: "Keyword", syntax: "import module", description: "Imports a module.", example: "import math\nprint(math.pi)"),
        ReferenceItem(keyword: "try", category: "Keyword", syntax: "try:", description: "Begins an exception-handling block.", example: "try:\n    x = int(\"abc\")"),
        ReferenceItem(keyword: "except", category: "Keyword", syntax: "except ExceptionType:", description: "Handles specific exceptions.", example: "except ValueError:\n    print(\"Invalid!\")"),
    ]
}
