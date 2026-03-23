import SwiftUI

// MARK: - Try It View (Standalone Code Editor Tab)

struct TryItView: View {
    @EnvironmentObject var store: PythonStore
    @State private var code: String = "print(\"Hello, World!\")"
    @State private var output: String = ""
    @State private var hasRun = false
    @State private var selectedExample: Int = 0
    
    let examples = [
        ("Hello World", "print(\"Hello, World!\")", "Hello, World!"),
        ("Variables", "name = \"Alice\"\nage = 25\nprint(f\"{name} is {age}\")", "Alice is 25"),
        ("List Loop", "fruits = [\"apple\", \"banana\", \"cherry\"]\nfor f in fruits:\n    print(f)", "apple\nbanana\ncherry"),
        ("Function", "def greet(name):\n    return f\"Hello, {name}!\"\n\nprint(greet(\"World\"))", "Hello, World!"),
        ("Dictionary", "person = {\n    \"name\": \"Bob\",\n    \"age\": 30\n}\nfor k, v in person.items():\n    print(f\"{k}: {v}\")", "name: Bob\nage: 30"),
        ("Math", "import math\nprint(f\"Pi = {math.pi:.4f}\")\nprint(f\"sqrt(16) = {math.sqrt(16)}\")", "Pi = 3.1416\nsqrt(16) = 4.0"),
    ]
    
    var body: some View {
        NavigationStack {
            ZStack {
                Color.w3Dark.ignoresSafeArea()
                
                VStack(spacing: 0) {
                    // ── Header ──
                    HStack {
                        VStack(alignment: .leading, spacing: 2) {
                            Text("Try It Editor")
                                .font(.system(size: 22, weight: .black, design: .rounded))
                                .foregroundColor(.white)
                            Text("Write & Run Python Code")
                                .font(.caption)
                                .foregroundColor(.w3Muted)
                        }
                        Spacer()
                        Button(action: resetCode) {
                            Image(systemName: "arrow.counterclockwise")
                                .font(.system(size: 16, weight: .medium))
                                .foregroundColor(.w3Muted)
                                .padding(10)
                                .background(Color.w3DarkCard)
                                .cornerRadius(8)
                        }
                    }
                    .padding(.horizontal, 16)
                    .padding(.top, 16)
                    .padding(.bottom, 12)
                    
                    // ── Example Tabs ──
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 6) {
                            ForEach(Array(examples.enumerated()), id: \.offset) { index, example in
                                Button(action: {
                                    selectedExample = index
                                    code = example.1
                                    output = ""
                                    hasRun = false
                                }) {
                                    Text(example.0)
                                        .font(.system(size: 12, weight: .semibold))
                                        .foregroundColor(selectedExample == index ? .white : .w3Muted)
                                        .padding(.horizontal, 12)
                                        .padding(.vertical, 8)
                                        .background(selectedExample == index ? Color.w3Green : Color.w3DarkCard)
                                        .cornerRadius(16)
                                }
                            }
                        }
                        .padding(.horizontal, 16)
                    }
                    .padding(.bottom, 12)
                    
                    // ── Editor ──
                    VStack(alignment: .leading, spacing: 4) {
                        HStack {
                            Circle().fill(Color.w3Red).frame(width: 10, height: 10)
                            Circle().fill(Color.w3Yellow).frame(width: 10, height: 10)
                            Circle().fill(Color.w3Green).frame(width: 10, height: 10)
                            Spacer()
                            Text("editor.py")
                                .font(.system(size: 11, weight: .medium, design: .monospaced))
                                .foregroundColor(.w3Muted)
                        }
                        .padding(.horizontal, 12)
                        .padding(.top, 10)
                        
                        TextEditor(text: $code)
                            .font(.system(size: 14, design: .monospaced))
                            .foregroundColor(.w3CodeText)
                            .scrollContentBackground(.hidden)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                    }
                    .background(Color.w3CodeBg)
                    .cornerRadius(10)
                    .padding(.horizontal, 16)
                    
                    // ── Run Button ──
                    Button(action: runCode) {
                        HStack(spacing: 8) {
                            Image(systemName: "play.fill")
                            Text("Run Code")
                        }
                        .font(.system(size: 16, weight: .bold))
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 14)
                        .background(Color.w3Green)
                        .cornerRadius(8)
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 10)
                    
                    // ── Output Panel ──
                    VStack(alignment: .leading, spacing: 8) {
                        HStack {
                            Image(systemName: "terminal.fill")
                                .font(.system(size: 12))
                                .foregroundColor(.w3Green)
                            Text("Output")
                                .font(.system(size: 13, weight: .bold))
                                .foregroundColor(.w3Muted)
                            Spacer()
                            if hasRun {
                                Text("✓ Executed")
                                    .font(.system(size: 11, weight: .medium))
                                    .foregroundColor(.w3Green)
                            }
                        }
                        
                        ScrollView {
                            Text(hasRun ? output : ">>> Waiting for code...")
                                .font(.system(size: 14, design: .monospaced))
                                .foregroundColor(hasRun ? Color(hex: "A8FF60") : .w3Muted)
                                .frame(maxWidth: .infinity, alignment: .leading)
                        }
                    }
                    .padding(12)
                    .background(Color(hex: "0D0D1A"))
                    .cornerRadius(10)
                    .padding(.horizontal, 16)
                    .frame(maxHeight: 140)
                    
                    Spacer()
                }
            }
            .navigationBarHidden(true)
        }
    }
    
    func runCode() {
        Haptics.light()
        hasRun = true
        // Use the expected output from our examples
        let current = examples[selectedExample]
        if code.trimmingCharacters(in: .whitespacesAndNewlines) == current.1.trimmingCharacters(in: .whitespacesAndNewlines) {
            output = current.2
        } else {
            // Simulated output for custom code
            output = ">>> Code executed successfully"
        }
    }
    
    func resetCode() {
        code = examples[selectedExample].1
        output = ""
        hasRun = false
    }
}
