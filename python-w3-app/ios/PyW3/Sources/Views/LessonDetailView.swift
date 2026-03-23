import SwiftUI

// MARK: - Lesson Detail View (W3Schools-style tutorial page)

struct LessonDetailView: View {
    @EnvironmentObject var store: PythonStore
    @Environment(\.dismiss) private var dismiss
    
    let topic: PythonTopic
    let lessonIndex: Int
    
    @State private var showTryIt = false
    @State private var showCompletion = false
    
    var lesson: PythonLesson {
        topic.lessons[lessonIndex]
    }
    
    var hasPrevious: Bool { lessonIndex > 0 }
    var hasNext: Bool { lessonIndex < topic.lessons.count - 1 }
    
    var body: some View {
        ZStack {
            Color.w3Dark.ignoresSafeArea()
            
            VStack(spacing: 0) {
                // ── Top Bar ──
                topBar
                
                ScrollView(showsIndicators: false) {
                    VStack(alignment: .leading, spacing: 20) {
                        
                        // ── Breadcrumb ──
                        HStack(spacing: 4) {
                            Text("Python")
                                .foregroundColor(.w3Green)
                            Text("/")
                                .foregroundColor(.w3Muted)
                            Text(topic.title)
                                .foregroundColor(.w3Blue)
                            Text("/")
                                .foregroundColor(.w3Muted)
                            Text(lesson.title)
                                .foregroundColor(.w3Muted)
                        }
                        .font(.system(size: 12))
                        .padding(.horizontal, 20)
                        
                        // ── Title ──
                        Text(lesson.title)
                            .font(.system(size: 28, weight: .black, design: .rounded))
                            .foregroundColor(.white)
                            .padding(.horizontal, 20)
                        
                        Divider().background(Color.white.opacity(0.1)).padding(.horizontal, 20)
                        
                        // ── Explanation ──
                        Text(lesson.explanation)
                            .font(.system(size: 15))
                            .foregroundColor(Color(hex: "D4D4D4"))
                            .lineSpacing(6)
                            .padding(.horizontal, 20)
                        
                        // ── Example Header ──
                        HStack {
                            Text("Example")
                                .font(.system(size: 18, weight: .bold))
                                .foregroundColor(.white)
                            Spacer()
                        }
                        .padding(.horizontal, 20)
                        
                        // ── Code Block ──
                        CodeBlockView(code: lesson.codeExample)
                            .padding(.horizontal, 20)
                        
                        // ── Try It Button ──
                        Button(action: {
                            showTryIt = true
                        }) {
                            HStack {
                                Image(systemName: "play.fill")
                                Text("Try it Yourself »")
                            }
                            .font(.system(size: 15, weight: .bold))
                            .foregroundColor(.white)
                            .padding(.horizontal, 24)
                            .padding(.vertical, 14)
                            .frame(maxWidth: .infinity)
                            .background(Color.w3Green)
                            .cornerRadius(8)
                        }
                        .padding(.horizontal, 20)
                        
                        // ── Complete Button ──
                        if !store.isComplete(lesson.id) {
                            Button(action: {
                                store.markComplete(lesson.id)
                                Haptics.success()
                                showCompletion = true
                                DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
                                    showCompletion = false
                                }
                            }) {
                                HStack {
                                    Image(systemName: "checkmark.circle.fill")
                                    Text("Mark as Complete")
                                }
                                .font(.system(size: 15, weight: .bold))
                                .foregroundColor(.w3Green)
                                .padding(.horizontal, 24)
                                .padding(.vertical, 14)
                                .frame(maxWidth: .infinity)
                                .background(Color.w3Green.opacity(0.12))
                                .overlay(RoundedRectangle(cornerRadius: 8).stroke(Color.w3Green.opacity(0.3), lineWidth: 1))
                                .cornerRadius(8)
                            }
                            .padding(.horizontal, 20)
                        } else {
                            HStack {
                                Image(systemName: "checkmark.seal.fill")
                                    .foregroundColor(.w3Green)
                                Text("Completed!")
                                    .font(.system(size: 15, weight: .bold))
                                    .foregroundColor(.w3Green)
                            }
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 14)
                            .background(Color.w3Green.opacity(0.08))
                            .cornerRadius(8)
                            .padding(.horizontal, 20)
                        }
                        
                        // ── Navigation ──
                        navButtons
                        
                        Spacer(minLength: 100)
                    }
                    .padding(.top, 16)
                }
            }
            
            // ── Completion overlay ──
            if showCompletion {
                VStack {
                    Spacer()
                    VStack(spacing: 12) {
                        ConfettiView().frame(height: 100)
                        Text("🎉 +10 XP!")
                            .font(.system(size: 28, weight: .black, design: .rounded))
                            .foregroundColor(.w3Green)
                        Text("Lesson Complete!")
                            .font(.headline)
                            .foregroundColor(.white)
                    }
                    .frame(maxWidth: .infinity)
                    .padding(30)
                    .background(Color.w3DarkCard.opacity(0.95))
                    .cornerRadius(20)
                    .padding(.horizontal, 30)
                    Spacer()
                }
                .background(Color.black.opacity(0.5))
                .ignoresSafeArea()
                .transition(.opacity)
            }
        }
        .navigationBarHidden(true)
        .sheet(isPresented: $showTryIt) {
            TryItEditorSheet(lesson: lesson)
                .environmentObject(store)
        }
    }
    
    // MARK: Top Bar
    
    var topBar: some View {
        HStack {
            Button(action: { dismiss() }) {
                HStack(spacing: 4) {
                    Image(systemName: "chevron.left")
                    Text("Back")
                }
                .font(.system(size: 15, weight: .medium))
                .foregroundColor(.w3Green)
            }
            Spacer()
            Text("\(lessonIndex + 1)/\(topic.lessons.count)")
                .font(.system(size: 13, weight: .bold))
                .foregroundColor(.w3Muted)
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 12)
        .background(Color.w3DarkCard)
    }
    
    // MARK: Nav Buttons
    
    var navButtons: some View {
        HStack(spacing: 12) {
            if hasPrevious {
                NavigationLink(destination: LessonDetailView(topic: topic, lessonIndex: lessonIndex - 1)) {
                    HStack {
                        Image(systemName: "chevron.left")
                        Text("Previous")
                    }
                    .font(.system(size: 14, weight: .bold))
                    .foregroundColor(.w3Muted)
                    .padding(.horizontal, 20)
                    .padding(.vertical, 12)
                    .background(Color.w3DarkCard)
                    .cornerRadius(8)
                }
            }
            
            Spacer()
            
            if hasNext {
                NavigationLink(destination: LessonDetailView(topic: topic, lessonIndex: lessonIndex + 1)) {
                    HStack {
                        Text("Next")
                        Image(systemName: "chevron.right")
                    }
                    .font(.system(size: 14, weight: .bold))
                    .foregroundColor(.white)
                    .padding(.horizontal, 20)
                    .padding(.vertical, 12)
                    .background(Color.w3Green)
                    .cornerRadius(8)
                }
            }
        }
        .padding(.horizontal, 20)
    }
}

// MARK: - Try It Editor Sheet

struct TryItEditorSheet: View {
    @EnvironmentObject var store: PythonStore
    @Environment(\.dismiss) private var dismiss
    let lesson: PythonLesson
    
    @State private var code: String = ""
    @State private var output: String = ""
    @State private var hasRun = false
    
    var body: some View {
        NavigationStack {
            ZStack {
                Color.w3Dark.ignoresSafeArea()
                
                VStack(spacing: 0) {
                    // Header
                    HStack {
                        Text("Try It Yourself")
                            .font(.system(size: 18, weight: .bold))
                            .foregroundColor(.white)
                        Spacer()
                        Button("Done") { dismiss() }
                            .font(.system(size: 15, weight: .semibold))
                            .foregroundColor(.w3Green)
                    }
                    .padding(.horizontal, 20)
                    .padding(.vertical, 14)
                    .background(Color.w3DarkCard)
                    
                    // Code label
                    HStack {
                        Text("Code:")
                            .font(.system(size: 13, weight: .bold))
                            .foregroundColor(.w3Muted)
                        Spacer()
                    }
                    .padding(.horizontal, 20)
                    .padding(.top, 16)
                    .padding(.bottom, 8)
                    
                    // Code editor
                    TextEditor(text: $code)
                        .font(.system(.body, design: .monospaced))
                        .foregroundColor(.w3CodeText)
                        .scrollContentBackground(.hidden)
                        .padding(12)
                        .background(Color.w3CodeBg)
                        .cornerRadius(8)
                        .padding(.horizontal, 16)
                        .frame(minHeight: 180)
                    
                    // Run button
                    Button(action: runCode) {
                        HStack {
                            Image(systemName: "play.fill")
                            Text("Run »")
                        }
                        .font(.system(size: 16, weight: .bold))
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 14)
                        .background(Color.w3Green)
                        .cornerRadius(8)
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 12)
                    
                    // Output label
                    HStack {
                        Text("Result:")
                            .font(.system(size: 13, weight: .bold))
                            .foregroundColor(.w3Muted)
                        Spacer()
                    }
                    .padding(.horizontal, 20)
                    .padding(.bottom, 8)
                    
                    // Output area
                    ScrollView {
                        Text(hasRun ? output : "Click \"Run\" to see the result...")
                            .font(.system(.body, design: .monospaced))
                            .foregroundColor(hasRun ? .w3Green : .w3Muted)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(12)
                    }
                    .background(Color(hex: "111122"))
                    .cornerRadius(8)
                    .padding(.horizontal, 16)
                    .frame(maxHeight: 150)
                    
                    Spacer()
                }
            }
            .navigationBarHidden(true)
        }
        .onAppear {
            code = lesson.tryItCode
        }
    }
    
    func runCode() {
        Haptics.light()
        hasRun = true
        // Simulate output
        output = lesson.expectedOutput
    }
}
