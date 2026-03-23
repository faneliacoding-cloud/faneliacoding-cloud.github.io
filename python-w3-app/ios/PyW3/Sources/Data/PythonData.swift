import Foundation

// MARK: - Python Tutorial Data — 6 Topics × 3-5 Lessons

struct PythonData {
    static let allTopics: [PythonTopic] = [
        gettingStarted,
        dataTypes,
        operatorsConditions,
        loops,
        dataStructures,
        functions
    ]
    
    // ─── Topic 1: Getting Started ───
    
    static let gettingStarted = PythonTopic(
        id: "getting_started",
        title: "Getting Started",
        icon: "play.circle.fill",
        color: "04AA6D",
        description: "Introduction to Python programming",
        lessons: [
            PythonLesson(
                id: "gs_intro",
                title: "Python Introduction",
                explanation: """
                Python is a popular programming language created by Guido van Rossum in 1991.
                
                It is used for:
                • Web development (server-side)
                • Software development
                • Mathematics and data science
                • System scripting and automation
                
                Python is designed for readability and uses simple English keywords with clean syntax. It works on different platforms (Windows, Mac, Linux) and can be written in a text editor or an IDE.
                """,
                codeExample: """
                # This is my first Python program
                print("Hello, World!")
                """,
                tryItCode: "print(\"Hello, World!\")",
                expectedOutput: "Hello, World!"
            ),
            PythonLesson(
                id: "gs_syntax",
                title: "Python Syntax",
                explanation: """
                Python syntax can be executed directly in the Command Line or by creating a .py file.
                
                Key syntax rules:
                • Python uses indentation (whitespace) to define code blocks
                • Python uses new lines to complete a command
                • Comments start with #
                • Variables are created when you assign a value
                
                Indentation is very important in Python! It indicates a block of code. The number of spaces is up to you, but it must be consistent.
                """,
                codeExample: """
                # Indentation matters!
                if 5 > 2:
                    print("Five is greater than two!")
                    
                # This would cause an error:
                # if 5 > 2:
                # print("Error!")  # No indentation!
                """,
                tryItCode: """
                if 5 > 2:
                    print("Five is greater than two!")
                """,
                expectedOutput: "Five is greater than two!"
            ),
            PythonLesson(
                id: "gs_comments",
                title: "Python Comments",
                explanation: """
                Comments are used to explain Python code and make it more readable. They can also prevent execution when testing code.
                
                • Single-line comments start with #
                • Multi-line comments use triple quotes (\"\"\")
                • Comments are ignored by the Python interpreter
                
                Writing good comments is a crucial skill for any programmer!
                """,
                codeExample: """
                # This is a single-line comment
                print("Hello!")  # inline comment
                
                \"\"\"
                This is a
                multi-line comment
                (docstring)
                \"\"\"
                print("Comments are useful!")
                """,
                tryItCode: """
                # Print a greeting
                print("Hello!")
                
                # This line won't run:
                # print("I'm commented out")

                print("Comments help explain code!")
                """,
                expectedOutput: "Hello!\nComments help explain code!"
            ),
            PythonLesson(
                id: "gs_variables",
                title: "Python Variables",
                explanation: """
                Variables are containers for storing data values. Unlike other programming languages, Python has no command for declaring a variable — it's created the moment you assign a value.
                
                Rules:
                • A variable name must start with a letter or underscore
                • Cannot start with a number
                • Can only contain alpha-numeric characters and underscores
                • Variable names are case-sensitive (age and Age are different)
                
                Python allows you to assign multiple values in one line!
                """,
                codeExample: """
                # Creating variables
                name = "Python"
                age = 33
                is_fun = True
                
                print(name)
                print(age)
                print(is_fun)
                
                # Multiple assignment
                x, y, z = "Apple", "Banana", "Cherry"
                print(x, y, z)
                """,
                tryItCode: """
                name = "Python"
                version = 3.12
                print("Language:", name)
                print("Version:", version)
                """,
                expectedOutput: "Language: Python\nVersion: 3.12"
            ),
            PythonLesson(
                id: "gs_datatypes_intro",
                title: "Data Types Overview",
                explanation: """
                In programming, data type is an important concept. Variables can store data of different types.
                
                Python has the following built-in data types:
                
                • Text: str
                • Numeric: int, float, complex
                • Sequence: list, tuple, range
                • Mapping: dict
                • Set: set, frozenset
                • Boolean: bool
                • None: NoneType
                
                You can get the data type of any object using the type() function.
                """,
                codeExample: """
                x = 5           # int
                y = 3.14        # float
                name = "Hello"  # str
                is_cool = True  # bool
                fruits = ["apple", "banana"]  # list
                
                print(type(x))
                print(type(y))
                print(type(name))
                print(type(is_cool))
                """,
                tryItCode: """
                x = 42
                y = "Hello"
                z = [1, 2, 3]
                print(type(x))
                print(type(y))
                print(type(z))
                """,
                expectedOutput: "<class 'int'>\n<class 'str'>\n<class 'list'>"
            )
        ]
    )
    
    // ─── Topic 2: Data Types ───
    
    static let dataTypes = PythonTopic(
        id: "data_types",
        title: "Data Types",
        icon: "textformat.abc",
        color: "2196F3",
        description: "Strings, numbers, and booleans",
        lessons: [
            PythonLesson(
                id: "dt_strings",
                title: "Python Strings",
                explanation: """
                Strings in Python are surrounded by either single quotes or double quotes. You can assign a multiline string using three quotes.
                
                Key features:
                • Strings are arrays of bytes representing Unicode characters
                • You can access characters using square brackets []
                • Strings have many built-in methods like upper(), lower(), strip()
                • Use len() to get the length of a string
                • Use + to concatenate strings
                """,
                codeExample: """
                greeting = "Hello, World!"
                
                # Access characters
                print(greeting[0])     # H
                print(greeting[0:5])   # Hello
                
                # String methods
                print(greeting.upper())
                print(greeting.lower())
                print(len(greeting))
                
                # F-strings (formatted)
                name = "Alice"
                age = 25
                print(f"My name is {name}, age {age}")
                """,
                tryItCode: """
                txt = "Hello, Python!"
                print(txt.upper())
                print(txt.lower())
                print("Length:", len(txt))

                name = "World"
                print(f"Hello, {name}!")
                """,
                expectedOutput: "HELLO, PYTHON!\nhello, python!\nLength: 14\nHello, World!"
            ),
            PythonLesson(
                id: "dt_numbers",
                title: "Python Numbers",
                explanation: """
                There are three numeric types in Python:
                
                • int — whole numbers (positive or negative), no decimals
                • float — numbers with decimal points
                • complex — numbers with imaginary parts
                
                Python uses standard math operators: + - * / ** // %
                
                Type conversion functions: int(), float(), str()
                """,
                codeExample: """
                # Integer
                x = 10
                # Float
                y = 3.14
                # Complex
                z = 2 + 3j
                
                # Arithmetic
                print(x + y)      # 13.14
                print(x ** 2)     # 100 (power)
                print(x // 3)     # 3 (floor division)
                print(x % 3)      # 1 (modulus)
                
                # Type conversion
                a = float(x)      # 10.0
                b = int(y)        # 3
                print(a, b)
                """,
                tryItCode: """
                x = 10
                y = 3
                print("Add:", x + y)
                print("Power:", x ** 2)
                print("Floor div:", x // y)
                print("Modulus:", x % y)
                """,
                expectedOutput: "Add: 13\nPower: 100\nFloor div: 3\nModulus: 1"
            ),
            PythonLesson(
                id: "dt_booleans",
                title: "Python Booleans",
                explanation: """
                Booleans represent one of two values: True or False.
                
                In programming you often need to know if an expression is True or False. When you compare two values, the expression is evaluated and Python returns the Boolean answer.
                
                Key points:
                • bool() function evaluates any value as True or False
                • Most values are True (non-empty strings, non-zero numbers)
                • False values: 0, None, False, empty strings, empty collections
                """,
                codeExample: """
                print(10 > 9)    # True
                print(10 == 9)   # False
                print(10 < 9)    # False
                
                # bool() function
                print(bool("Hello"))  # True
                print(bool(0))        # False
                print(bool(""))       # False
                print(bool([1,2,3]))  # True
                
                a = 200
                b = 33
                if b > a:
                    print("b is greater")
                else:
                    print("a is greater")
                """,
                tryItCode: """
                print(10 > 5)
                print(10 == 5)
                print(bool("Hello"))
                print(bool(0))
                print(bool(""))
                """,
                expectedOutput: "True\nFalse\nTrue\nFalse\nFalse"
            ),
            PythonLesson(
                id: "dt_casting",
                title: "Type Casting",
                explanation: """
                There may be times when you want to specify or change the data type of a variable. This is called casting.
                
                Casting functions:
                • int() — constructs an integer
                • float() — constructs a float
                • str() — constructs a string
                
                You can convert between types as needed, but be careful — not all conversions are valid!
                """,
                codeExample: """
                # int to float
                x = float(1)     # 1.0
                
                # float to int (truncates)
                y = int(2.8)     # 2
                
                # string to int
                z = int("3")     # 3
                
                # number to string
                s = str(3.14)    # "3.14"
                
                print(x, type(x))
                print(y, type(y))
                print(z, type(z))
                print(s, type(s))
                """,
                tryItCode: """
                x = int(2.8)
                y = float("3.5")
                z = str(100)
                print(x, type(x))
                print(y, type(y))
                print(z, type(z))
                """,
                expectedOutput: "2 <class 'int'>\n3.5 <class 'float'>\n100 <class 'str'>"
            )
        ]
    )
    
    // ─── Topic 3: Operators & Conditions ───
    
    static let operatorsConditions = PythonTopic(
        id: "operators_conditions",
        title: "Conditions",
        icon: "arrow.triangle.branch",
        color: "FF9800",
        description: "If/elif/else and operators",
        lessons: [
            PythonLesson(
                id: "oc_operators",
                title: "Python Operators",
                explanation: """
                Operators are used to perform operations on variables and values.
                
                Python divides operators into groups:
                • Arithmetic: + - * / % ** //
                • Assignment: = += -= *= /=
                • Comparison: == != > < >= <=
                • Logical: and, or, not
                • Identity: is, is not
                • Membership: in, not in
                """,
                codeExample: """
                # Comparison
                print(5 == 5)     # True
                print(5 != 3)     # True
                print(5 > 3)      # True
                
                # Logical
                x = 5
                print(x > 3 and x < 10)   # True
                print(x > 3 or x > 10)    # True
                print(not(x > 3))          # False
                
                # Membership
                fruits = ["apple", "banana"]
                print("apple" in fruits)     # True
                print("grape" not in fruits) # True
                """,
                tryItCode: """
                x = 10
                print(x > 5 and x < 20)
                print(x == 10 or x == 20)

                colors = ["red", "blue", "green"]
                print("blue" in colors)
                print("yellow" not in colors)
                """,
                expectedOutput: "True\nTrue\nTrue\nTrue"
            ),
            PythonLesson(
                id: "oc_if",
                title: "Python If...Else",
                explanation: """
                Python supports the usual logical conditions from mathematics. These conditions can be used in "if statements" and loops.
                
                An if statement is written by using the if keyword:
                • if — first condition
                • elif — "else if" for additional conditions
                • else — catches anything not caught by preceding conditions
                
                Python relies on indentation to define the scope of the code.
                """,
                codeExample: """
                age = 20
                
                if age < 13:
                    print("Child")
                elif age < 18:
                    print("Teenager")
                elif age < 65:
                    print("Adult")
                else:
                    print("Senior")
                    
                # Short hand if
                if age >= 18: print("You can vote!")
                
                # Ternary operator
                status = "minor" if age < 18 else "adult"
                print(status)
                """,
                tryItCode: """
                score = 85

                if score >= 90:
                    grade = "A"
                elif score >= 80:
                    grade = "B"
                elif score >= 70:
                    grade = "C"
                else:
                    grade = "F"

                print(f"Score: {score}, Grade: {grade}")
                """,
                expectedOutput: "Score: 85, Grade: B"
            ),
            PythonLesson(
                id: "oc_nested",
                title: "Nested If & Logical",
                explanation: """
                You can have if statements inside if statements — this is called nested if statements.
                
                You can also combine conditions using logical operators:
                • and — both conditions must be true
                • or — at least one condition must be true
                • not — reverses the result
                
                The pass statement is used as a placeholder for future code in empty if/else blocks.
                """,
                codeExample: """
                x = 41
                
                if x > 10:
                    print("Above ten,")
                    if x > 20:
                        print("and also above 20!")
                    else:
                        print("but not above 20.")
                
                # Using and / or
                a, b, c = 2, 5, 10
                if a < b and b < c:
                    print("Both conditions are True")
                
                if a > b or a < c:
                    print("At least one is True")
                """,
                tryItCode: """
                temp = 75

                if temp > 60:
                    print("It's warm")
                    if temp > 80:
                        print("It's hot!")
                    else:
                        print("It's comfortable")

                print("Enjoy your day!")
                """,
                expectedOutput: "It's warm\nIt's comfortable\nEnjoy your day!"
            )
        ]
    )
    
    // ─── Topic 4: Loops ───
    
    static let loops = PythonTopic(
        id: "loops",
        title: "Loops",
        icon: "repeat",
        color: "9C27B0",
        description: "While loops, for loops, range",
        lessons: [
            PythonLesson(
                id: "lp_while",
                title: "While Loops",
                explanation: """
                With the while loop we can execute a set of statements as long as a condition is true.
                
                Key concepts:
                • The while loop requires a condition
                • Remember to increment/change the variable, or the loop will never end!
                • Use break to stop the loop
                • Use continue to skip the current iteration
                • Use else to run code when the condition is no longer true
                """,
                codeExample: """
                # Count from 1 to 5
                i = 1
                while i <= 5:
                    print(i)
                    i += 1
                
                # With break
                i = 1
                while i < 10:
                    if i == 3:
                        break
                    print(i)
                    i += 1
                """,
                tryItCode: """
                count = 1
                while count <= 5:
                    print(f"Count: {count}")
                    count += 1
                print("Done!")
                """,
                expectedOutput: "Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5\nDone!"
            ),
            PythonLesson(
                id: "lp_for",
                title: "For Loops",
                explanation: """
                A for loop is used for iterating over a sequence (list, tuple, dictionary, set, or string).
                
                With the for loop we can execute a set of statements, once for each item in the sequence.
                
                Key features:
                • Iterates over any sequence
                • Use break to exit the loop early
                • Use continue to skip current iteration
                • The else block runs when the loop finishes normally
                """,
                codeExample: """
                # Loop through a list
                fruits = ["apple", "banana", "cherry"]
                for fruit in fruits:
                    print(fruit)
                
                # Loop through a string
                for char in "Python":
                    print(char, end=" ")
                print()
                
                # With break
                for x in range(10):
                    if x == 5:
                        break
                    print(x, end=" ")
                """,
                tryItCode: """
                languages = ["Python", "JavaScript", "Swift"]
                for lang in languages:
                    print(f"I love {lang}!")
                """,
                expectedOutput: "I love Python!\nI love JavaScript!\nI love Swift!"
            ),
            PythonLesson(
                id: "lp_range",
                title: "Range & Nested Loops",
                explanation: """
                The range() function returns a sequence of numbers, starting from 0 by default, and increments by 1.
                
                • range(stop) — 0 to stop-1
                • range(start, stop) — start to stop-1
                • range(start, stop, step) — with custom step
                
                A nested loop is a loop inside another loop. The inner loop will execute once for each iteration of the outer loop.
                """,
                codeExample: """
                # range basics
                for x in range(5):
                    print(x, end=" ")    # 0 1 2 3 4
                print()
                
                for x in range(2, 8):
                    print(x, end=" ")    # 2 3 4 5 6 7
                print()
                
                for x in range(0, 30, 5):
                    print(x, end=" ")    # 0 5 10 15 20 25
                print()
                
                # Nested loop
                for i in range(1, 4):
                    for j in range(1, 4):
                        print(f"{i}×{j}={i*j}", end="  ")
                    print()
                """,
                tryItCode: """
                for i in range(1, 6):
                    print("*" * i)
                """,
                expectedOutput: "*\n**\n***\n****\n*****"
            )
        ]
    )
    
    // ─── Topic 5: Data Structures ───
    
    static let dataStructures = PythonTopic(
        id: "data_structures",
        title: "Data Structures",
        icon: "square.stack.3d.up",
        color: "F44336",
        description: "Lists, tuples, dictionaries, sets",
        lessons: [
            PythonLesson(
                id: "ds_lists",
                title: "Python Lists",
                explanation: """
                Lists are used to store multiple items in a single variable. They are one of 4 built-in data types in Python.
                
                Key features:
                • Lists are ordered and changeable (mutable)
                • Allow duplicate members
                • Created using square brackets []
                • Items are indexed, starting from 0
                • Methods: append(), insert(), remove(), pop(), sort()
                """,
                codeExample: """
                fruits = ["apple", "banana", "cherry"]
                
                # Access items
                print(fruits[0])        # apple
                print(fruits[-1])       # cherry
                print(fruits[0:2])      # ['apple', 'banana']
                
                # Modify
                fruits.append("orange")
                fruits.insert(1, "mango")
                fruits.remove("banana")
                
                print(fruits)
                print(f"Length: {len(fruits)}")
                """,
                tryItCode: """
                colors = ["red", "green", "blue"]
                colors.append("yellow")
                colors.sort()
                for c in colors:
                    print(c)
                print(f"Total: {len(colors)}")
                """,
                expectedOutput: "blue\ngreen\nred\nyellow\nTotal: 4"
            ),
            PythonLesson(
                id: "ds_tuples",
                title: "Python Tuples",
                explanation: """
                Tuples are used to store multiple items. They are similar to lists, but tuples are immutable — you cannot change them after creation.
                
                Key features:
                • Ordered and unchangeable
                • Allow duplicates
                • Created using round brackets ()
                • Faster than lists for large data
                • Can be used as dictionary keys (unlike lists)
                """,
                codeExample: """
                # Creating a tuple
                coords = (10, 20, 30)
                print(coords[0])     # 10
                print(len(coords))   # 3
                
                # Unpacking
                x, y, z = coords
                print(f"x={x}, y={y}, z={z}")
                
                # Tuple with one item (need trailing comma)
                single = ("hello",)
                print(type(single))  # <class 'tuple'>
                
                # Check if item exists
                print(20 in coords)  # True
                """,
                tryItCode: """
                point = (5, 10)
                x, y = point
                print(f"X: {x}")
                print(f"Y: {y}")
                print(f"Sum: {x + y}")
                """,
                expectedOutput: "X: 5\nY: 10\nSum: 15"
            ),
            PythonLesson(
                id: "ds_dicts",
                title: "Python Dictionaries",
                explanation: """
                Dictionaries are used to store data values in key:value pairs. They are ordered, changeable, and do not allow duplicate keys.
                
                Key features:
                • Written with curly brackets {}
                • Have keys and values
                • Access values using keys: dict[key]
                • Methods: keys(), values(), items(), get(), update()
                • Very fast lookups by key
                """,
                codeExample: """
                student = {
                    "name": "Alice",
                    "age": 20,
                    "grade": "A"
                }
                
                # Access
                print(student["name"])
                print(student.get("age"))
                
                # Modify
                student["age"] = 21
                student["school"] = "MIT"
                
                # Loop
                for key, value in student.items():
                    print(f"{key}: {value}")
                """,
                tryItCode: """
                car = {"brand": "Tesla", "model": "Model 3", "year": 2024}
                for k, v in car.items():
                    print(f"{k}: {v}")
                """,
                expectedOutput: "brand: Tesla\nmodel: Model 3\nyear: 2024"
            ),
            PythonLesson(
                id: "ds_sets",
                title: "Python Sets",
                explanation: """
                Sets are used to store multiple items, but unlike lists, they are unordered and don't allow duplicates.
                
                Key features:
                • Unordered — items have no index
                • No duplicates allowed
                • Created with curly brackets {} or set()
                • Useful for removing duplicates
                • Support mathematical operations: union, intersection, difference
                """,
                codeExample: """
                fruits = {"apple", "banana", "cherry"}
                
                # Duplicate ignored
                fruits.add("apple")
                print(fruits)  # still 3 items
                print(len(fruits))
                
                # Set operations
                a = {1, 2, 3, 4}
                b = {3, 4, 5, 6}
                print(a | b)   # Union: {1,2,3,4,5,6}
                print(a & b)   # Intersection: {3,4}
                print(a - b)   # Difference: {1,2}
                """,
                tryItCode: """
                nums = [1, 2, 2, 3, 3, 3, 4]
                unique = set(nums)
                print(f"Original: {nums}")
                print(f"Unique: {sorted(unique)}")
                print(f"Count: {len(unique)}")
                """,
                expectedOutput: "Original: [1, 2, 2, 3, 3, 3, 4]\nUnique: [1, 2, 3, 4]\nCount: 4"
            )
        ]
    )
    
    // ─── Topic 6: Functions ───
    
    static let functions = PythonTopic(
        id: "functions",
        title: "Functions",
        icon: "function",
        color: "FFC107",
        description: "Defining, parameters, return, lambda",
        lessons: [
            PythonLesson(
                id: "fn_defining",
                title: "Defining Functions",
                explanation: """
                A function is a block of code which only runs when it is called. You can pass data (parameters) into a function. A function can return data.
                
                • In Python a function is defined using the def keyword
                • To call a function, use the function name followed by ()
                • Functions help organize code into reusable blocks
                """,
                codeExample: """
                # Define a function
                def greet(name):
                    print(f"Hello, {name}!")
                
                # Call the function
                greet("Alice")
                greet("Bob")
                
                # Function with default parameter
                def greet_with(name, greeting="Hi"):
                    print(f"{greeting}, {name}!")
                
                greet_with("Charlie")
                greet_with("Diana", "Hey")
                """,
                tryItCode: """
                def say_hello(name):
                    print(f"Hello, {name}!")

                say_hello("Python")
                say_hello("World")
                """,
                expectedOutput: "Hello, Python!\nHello, World!"
            ),
            PythonLesson(
                id: "fn_params",
                title: "Parameters & Arguments",
                explanation: """
                Information can be passed into functions as arguments. Arguments are specified after the function name, inside the parentheses.
                
                Types of arguments:
                • Positional arguments — order matters
                • Keyword arguments — key=value pairs
                • Default parameter values
                • *args — arbitrary number of arguments
                • **kwargs — arbitrary keyword arguments
                """,
                codeExample: """
                # Keyword arguments
                def describe(name, age, city):
                    print(f"{name}, age {age}, from {city}")
                
                describe(name="Alice", age=25, city="NYC")
                
                # *args
                def add_all(*numbers):
                    return sum(numbers)
                
                print(add_all(1, 2, 3))      # 6
                print(add_all(10, 20, 30, 40)) # 100
                
                # **kwargs
                def show_info(**data):
                    for k, v in data.items():
                        print(f"{k}: {v}")
                
                show_info(lang="Python", year=1991)
                """,
                tryItCode: """
                def add(*numbers):
                    total = sum(numbers)
                    print(f"Sum: {total}")

                add(1, 2, 3)
                add(10, 20, 30, 40)
                """,
                expectedOutput: "Sum: 6\nSum: 100"
            ),
            PythonLesson(
                id: "fn_return",
                title: "Return Values",
                explanation: """
                To let a function return a value, use the return statement.
                
                Key points:
                • A function can return any data type
                • You can return multiple values as a tuple
                • If no return statement, the function returns None
                • Use return to exit a function early
                """,
                codeExample: """
                def square(x):
                    return x ** 2
                
                result = square(5)
                print(result)  # 25
                
                # Return multiple values
                def min_max(numbers):
                    return min(numbers), max(numbers)
                
                lo, hi = min_max([3, 1, 4, 1, 5, 9])
                print(f"Min: {lo}, Max: {hi}")
                
                # Using return in calculations
                def area(length, width):
                    return length * width
                
                print(f"Area: {area(5, 3)}")
                """,
                tryItCode: """
                def multiply(a, b):
                    return a * b

                result = multiply(7, 6)
                print(f"7 × 6 = {result}")
                print(f"3 × 4 = {multiply(3, 4)}")
                """,
                expectedOutput: "7 × 6 = 42\n3 × 4 = 12"
            ),
            PythonLesson(
                id: "fn_lambda",
                title: "Lambda Functions",
                explanation: """
                A lambda function is a small anonymous function. It can take any number of arguments, but can only have one expression.
                
                Syntax: lambda arguments : expression
                
                Lambda functions are useful when you need a short function for a short period of time. They're often used with map(), filter(), and sorted().
                """,
                codeExample: """
                # Simple lambda
                double = lambda x: x * 2
                print(double(5))   # 10
                
                # Lambda with multiple args
                add = lambda a, b: a + b
                print(add(3, 4))   # 7
                
                # Using with sorted
                points = [(1, 2), (3, 1), (2, 4)]
                sorted_points = sorted(points, key=lambda p: p[1])
                print(sorted_points)
                
                # Using with map
                numbers = [1, 2, 3, 4, 5]
                squared = list(map(lambda x: x**2, numbers))
                print(squared)
                """,
                tryItCode: """
                square = lambda x: x ** 2
                numbers = [1, 2, 3, 4, 5]
                result = list(map(square, numbers))
                print(f"Squared: {result}")
                """,
                expectedOutput: "Squared: [1, 4, 9, 16, 25]"
            )
        ]
    )
}
