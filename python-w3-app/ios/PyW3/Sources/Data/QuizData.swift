import Foundation

// MARK: - Quiz Questions — grouped by topic

struct QuizData {
    static let allQuestions: [QuizQuestion] = [
        // ── Getting Started ──
        QuizQuestion(topic: "getting_started", question: "What is the correct file extension for Python files?", codeSnippet: nil, options: [".py", ".python", ".pt", ".pn"], correctIndex: 0, explanation: "Python files use the .py extension."),
        QuizQuestion(topic: "getting_started", question: "How do you output text in Python?", codeSnippet: nil, options: ["echo(\"Hello\")", "print(\"Hello\")", "console.log(\"Hello\")", "printf(\"Hello\")"], correctIndex: 1, explanation: "The print() function outputs text to the console."),
        QuizQuestion(topic: "getting_started", question: "What does Python use to define code blocks?", codeSnippet: nil, options: ["Curly braces {}", "Parentheses ()", "Indentation", "Square brackets []"], correctIndex: 2, explanation: "Python uses indentation (whitespace) to define blocks of code."),
        QuizQuestion(topic: "getting_started", question: "Which symbol starts a single-line comment?", codeSnippet: nil, options: ["//", "/*", "#", "--"], correctIndex: 2, explanation: "Single-line comments in Python start with #."),
        QuizQuestion(topic: "getting_started", question: "Which is a valid variable name?", codeSnippet: nil, options: ["2name", "my-var", "_count", "my var"], correctIndex: 2, explanation: "Variable names can start with a letter or underscore, and cannot contain spaces or hyphens."),
        
        // ── Data Types ──
        QuizQuestion(topic: "data_types", question: "What is the output?", codeSnippet: "print(type(3.14))", options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'double'>"], correctIndex: 1, explanation: "3.14 is a floating-point number, so type() returns float."),
        QuizQuestion(topic: "data_types", question: "How do you get the length of a string?", codeSnippet: "txt = \"Hello\"", options: ["txt.length()", "txt.size()", "len(txt)", "txt.count()"], correctIndex: 2, explanation: "The len() function returns the length of a string."),
        QuizQuestion(topic: "data_types", question: "What does str(42) return?", codeSnippet: nil, options: ["42", "\"42\"", "Error", "None"], correctIndex: 1, explanation: "str() converts a number to its string representation."),
        QuizQuestion(topic: "data_types", question: "What is the output?", codeSnippet: "print(\"Python\"[0])", options: ["P", "y", "Python", "Error"], correctIndex: 0, explanation: "String indexing starts at 0, so [0] returns the first character."),
        QuizQuestion(topic: "data_types", question: "What does int(3.9) return?", codeSnippet: nil, options: ["4", "3", "3.0", "Error"], correctIndex: 1, explanation: "int() truncates the decimal part, it doesn't round."),
        
        // ── Operators & Conditions ──
        QuizQuestion(topic: "operators_conditions", question: "What is 10 % 3 in Python?", codeSnippet: nil, options: ["3", "1", "0", "3.33"], correctIndex: 1, explanation: "% is the modulus operator. 10 ÷ 3 = 3 remainder 1."),
        QuizQuestion(topic: "operators_conditions", question: "What is the correct syntax?", codeSnippet: nil, options: ["if x > 5:", "if (x > 5)", "if x > 5 then:", "if x > 5;"], correctIndex: 0, explanation: "Python if statements end with a colon and don't require parentheses."),
        QuizQuestion(topic: "operators_conditions", question: "What keyword handles a second condition?", codeSnippet: nil, options: ["else if", "elsif", "elif", "elseif"], correctIndex: 2, explanation: "Python uses elif (short for else if) for additional conditions."),
        QuizQuestion(topic: "operators_conditions", question: "What is the output?", codeSnippet: "print(5 > 3 and 10 < 5)", options: ["True", "False", "Error", "None"], correctIndex: 1, explanation: "'and' requires both conditions to be True. 10 < 5 is False."),
        
        // ── Loops ──
        QuizQuestion(topic: "loops", question: "How many times does this loop run?", codeSnippet: "for i in range(5):\n    print(i)", options: ["4", "5", "6", "Infinite"], correctIndex: 1, explanation: "range(5) produces 0,1,2,3,4 — five iterations."),
        QuizQuestion(topic: "loops", question: "What does 'break' do in a loop?", codeSnippet: nil, options: ["Skips one iteration", "Exits the loop", "Restarts the loop", "Pauses the loop"], correctIndex: 1, explanation: "break immediately exits the loop entirely."),
        QuizQuestion(topic: "loops", question: "What does 'continue' do in a loop?", codeSnippet: nil, options: ["Exits the loop", "Skips to next iteration", "Restarts from 0", "Does nothing"], correctIndex: 1, explanation: "continue skips the rest of the current iteration and moves to the next one."),
        QuizQuestion(topic: "loops", question: "What is range(2, 8)?", codeSnippet: nil, options: ["2,3,4,5,6,7", "2,3,4,5,6,7,8", "0,1,2,3,4,5,6,7", "3,4,5,6,7"], correctIndex: 0, explanation: "range(2,8) generates numbers from 2 up to but not including 8."),
        
        // ── Data Structures ──
        QuizQuestion(topic: "data_structures", question: "Which is a valid list?", codeSnippet: nil, options: ["(1, 2, 3)", "[1, 2, 3]", "{1, 2, 3}", "{1: 2, 3: 4}"], correctIndex: 1, explanation: "Lists use square brackets []."),
        QuizQuestion(topic: "data_structures", question: "How do you add an item to a list?", codeSnippet: "fruits = [\"apple\"]", options: ["fruits.add(\"banana\")", "fruits.append(\"banana\")", "fruits.push(\"banana\")", "fruits.insert(\"banana\")"], correctIndex: 1, explanation: "The append() method adds an item to the end of a list."),
        QuizQuestion(topic: "data_structures", question: "Tuples are:", codeSnippet: nil, options: ["Mutable and ordered", "Immutable and ordered", "Mutable and unordered", "Immutable and unordered"], correctIndex: 1, explanation: "Tuples are ordered but immutable — you can't change them."),
        QuizQuestion(topic: "data_structures", question: "How do you access a dict value?", codeSnippet: "d = {\"name\": \"Alice\"}", options: ["d.name", "d[\"name\"]", "d(name)", "d->name"], correctIndex: 1, explanation: "Dictionary values are accessed using dict[key] syntax."),
        
        // ── Functions ──
        QuizQuestion(topic: "functions", question: "Which keyword defines a function?", codeSnippet: nil, options: ["function", "func", "def", "define"], correctIndex: 2, explanation: "Python uses the 'def' keyword to define functions."),
        QuizQuestion(topic: "functions", question: "What is the output?", codeSnippet: "def add(a, b):\n    return a + b\nprint(add(3, 4))", options: ["34", "7", "Error", "None"], correctIndex: 1, explanation: "The function returns 3 + 4 = 7."),
        QuizQuestion(topic: "functions", question: "What is a lambda function?", codeSnippet: nil, options: ["A named function", "A class method", "An anonymous function", "A built-in function"], correctIndex: 2, explanation: "Lambda functions are small anonymous (unnamed) functions."),
        QuizQuestion(topic: "functions", question: "What does *args allow?", codeSnippet: nil, options: ["Only 1 argument", "Exactly 2 arguments", "Any number of arguments", "No arguments"], correctIndex: 2, explanation: "*args allows a function to accept any number of positional arguments."),
    ]
}
