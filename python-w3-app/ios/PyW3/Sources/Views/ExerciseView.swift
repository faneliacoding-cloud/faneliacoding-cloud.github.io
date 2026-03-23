import SwiftUI

struct ExerciseView: View {
    @EnvironmentObject var store: PythonStore
    @State private var selectedTopic: String = "getting_started"
    @State private var currentQuestion: Int = 0
    @State private var selectedAnswer: Int? = nil
    @State private var showResult = false
    @State private var isCorrect = false
    @State private var score: Int = 0
    @State private var answered: Int = 0
    @State private var finished = false
    @State private var shake = false

    var questions: [QuizQuestion] { store.quizzes.filter { $0.topic == selectedTopic } }
    var currentQ: QuizQuestion? { currentQuestion < questions.count ? questions[currentQuestion] : nil }
    var pct: Int { answered == 0 ? 0 : Int(Double(score) / Double(answered) * 100) }

    var body: some View {
        NavigationStack {
            ZStack {
                Color.w3Dark.ignoresSafeArea()
                VStack(spacing: 0) {
                    header
                    topicChips
                    if finished { resultsView } else if let q = currentQ { questionCard(q) } else {
                        VStack(spacing: 16) {
                            Spacer()
                            Image(systemName: "questionmark.circle").font(.system(size: 48)).foregroundColor(.w3Muted)
                            Text("No exercises yet").font(.system(size: 18, weight: .bold)).foregroundColor(.white)
                            Text("Check back soon!").font(.caption).foregroundColor(.w3Muted)
                            Spacer()
                        }.frame(maxWidth: .infinity)
                    }
                }
            }
            .navigationBarHidden(true)
        }
    }

    var header: some View {
        HStack {
            VStack(alignment: .leading, spacing: 2) {
                Text("Python Exercises").font(.system(size: 22, weight: .black, design: .rounded)).foregroundColor(.white)
                Text("Test Your Knowledge").font(.caption).foregroundColor(.w3Muted)
            }
            Spacer()
            VStack(spacing: 2) { Text("⭐").font(.title3); Text("\(store.xp) XP").font(.system(size: 11, weight: .bold)).foregroundColor(.w3Yellow) }
        }
        .padding(.horizontal, 16).padding(.top, 16).padding(.bottom, 12)
    }

    var topicChips: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(store.topics) { t in
                    Button { selectedTopic = t.id; resetQuiz() } label: {
                        VStack(spacing: 4) {
                            Text(t.title).font(.system(size: 12, weight: .semibold))
                            if let b = store.quizHighScores[t.id] { Text("\(b)%").font(.system(size: 10, weight: .bold)).foregroundColor(.w3Yellow) }
                        }
                        .foregroundColor(selectedTopic == t.id ? .white : .w3Muted)
                        .padding(.horizontal, 14).padding(.vertical, 10)
                        .background(selectedTopic == t.id ? Color.w3Green : Color.w3DarkCard)
                        .cornerRadius(16)
                    }
                }
            }.padding(.horizontal, 16)
        }.padding(.bottom, 16)
    }

    func questionCard(_ q: QuizQuestion) -> some View {
        ScrollView(showsIndicators: false) {
            VStack(alignment: .leading, spacing: 20) {
                HStack {
                    Text("Question \(currentQuestion+1)/\(questions.count)").font(.system(size: 13, weight: .bold)).foregroundColor(.w3Muted)
                    Spacer()
                    Text("Score: \(score)/\(answered)").font(.system(size: 13, weight: .bold)).foregroundColor(.w3Green)
                }.padding(.horizontal, 20)

                GeometryReader { g in
                    ZStack(alignment: .leading) {
                        RoundedRectangle(cornerRadius: 4).fill(Color.white.opacity(0.06)).frame(height: 6)
                        RoundedRectangle(cornerRadius: 4).fill(Color.w3Green).frame(width: g.size.width * Double(currentQuestion+1)/Double(questions.count), height: 6)
                    }
                }.frame(height: 6).padding(.horizontal, 20)

                Text(q.question).font(.system(size: 20, weight: .bold)).foregroundColor(.white).padding(.horizontal, 20)
                if let s = q.codeSnippet { CodeBlockView(code: s).padding(.horizontal, 20) }

                VStack(spacing: 10) {
                    ForEach(Array(q.options.enumerated()), id: \.offset) { i, opt in
                        Button { if !showResult { selectedAnswer = i; check(q) } } label: {
                            HStack {
                                Text(["A","B","C","D"][i]).font(.system(size: 14, weight: .bold, design: .monospaced))
                                    .foregroundColor(lColor(i, q)).frame(width: 32, height: 32).background(lBg(i, q)).cornerRadius(8)
                                Text(opt).font(.system(size: 15, weight: .medium)).foregroundColor(.white)
                                Spacer()
                                if showResult && i == q.correctIndex { Image(systemName: "checkmark.circle.fill").foregroundColor(.w3Green) }
                                else if showResult && i == selectedAnswer && !isCorrect { Image(systemName: "xmark.circle.fill").foregroundColor(.w3Red) }
                            }
                            .padding(14).background(oBg(i, q)).overlay(RoundedRectangle(cornerRadius: 10).stroke(oBorder(i, q), lineWidth: 2)).cornerRadius(10)
                        }.disabled(showResult)
                    }
                }.padding(.horizontal, 20).offset(x: shake ? -6 : 0).animation(shake ? .default.repeatCount(3, autoreverses: true).speed(6) : .default, value: shake)

                if showResult {
                    VStack(alignment: .leading, spacing: 8) {
                        HStack { Image(systemName: isCorrect ? "lightbulb.fill" : "exclamationmark.triangle.fill").foregroundColor(isCorrect ? .w3Yellow : .w3Orange)
                            Text(isCorrect ? "Correct!" : "Not quite...").font(.system(size: 16, weight: .bold)).foregroundColor(isCorrect ? .w3Green : .w3Red) }
                        Text(q.explanation).font(.system(size: 14)).foregroundColor(.w3Muted)
                    }.padding(16).background(isCorrect ? Color.w3Green.opacity(0.08) : Color.w3Red.opacity(0.08)).cornerRadius(10).padding(.horizontal, 20)

                    Button { nextQ() } label: {
                        Text(currentQuestion < questions.count - 1 ? "Next Question →" : "See Results")
                            .font(.system(size: 16, weight: .bold)).foregroundColor(.white).frame(maxWidth: .infinity).padding(.vertical, 14).background(Color.w3Green).cornerRadius(8)
                    }.padding(.horizontal, 20)
                }
                Spacer(minLength: 100)
            }.padding(.top, 8)
        }
    }

    var resultsView: some View {
        ScrollView {
            VStack(spacing: 24) {
                Spacer(minLength: 30)
                ZStack {
                    Circle().stroke(Color.white.opacity(0.06), lineWidth: 8).frame(width: 140, height: 140)
                    Circle().trim(from: 0, to: Double(score)/Double(max(1, answered))).stroke(pct >= 70 ? Color.w3Green : pct >= 40 ? Color.w3Yellow : Color.w3Red, style: StrokeStyle(lineWidth: 8, lineCap: .round)).frame(width: 140, height: 140).rotationEffect(.degrees(-90))
                    VStack(spacing: 4) { Text("\(pct)%").font(.system(size: 36, weight: .black, design: .rounded)).foregroundColor(.white); Text("\(score)/\(answered)").font(.system(size: 14)).foregroundColor(.w3Muted) }
                }
                Text(pct >= 90 ? "🏆 Excellent!" : pct >= 70 ? "🎉 Great Job!" : pct >= 40 ? "📚 Keep Practicing!" : "💪 Don't Give Up!").font(.system(size: 22, weight: .bold)).foregroundColor(.white)
                Text("+\(score * 5) XP Earned!").font(.system(size: 16, weight: .bold)).foregroundColor(.w3Yellow)
                if pct >= 70 { ConfettiView().frame(height: 80) }
                Button { resetQuiz() } label: {
                    HStack { Image(systemName: "arrow.counterclockwise"); Text("Try Again") }
                        .font(.system(size: 16, weight: .bold)).foregroundColor(.white).frame(maxWidth: .infinity).padding(.vertical, 14).background(Color.w3Green).cornerRadius(8)
                }.padding(.horizontal, 40)
                Spacer(minLength: 100)
            }
        }
    }

    func lColor(_ i: Int, _ q: QuizQuestion) -> Color { showResult && i == q.correctIndex ? .white : showResult && i == selectedAnswer && !isCorrect ? .white : .w3Muted }
    func lBg(_ i: Int, _ q: QuizQuestion) -> Color { showResult && i == q.correctIndex ? .w3Green : showResult && i == selectedAnswer && !isCorrect ? .w3Red : Color.white.opacity(0.06) }
    func oBg(_ i: Int, _ q: QuizQuestion) -> Color { showResult && i == q.correctIndex ? Color.w3Green.opacity(0.08) : showResult && i == selectedAnswer && !isCorrect ? Color.w3Red.opacity(0.08) : Color.w3DarkCard }
    func oBorder(_ i: Int, _ q: QuizQuestion) -> Color { showResult && i == q.correctIndex ? .w3Green.opacity(0.4) : showResult && i == selectedAnswer && !isCorrect ? .w3Red.opacity(0.4) : .clear }

    func check(_ q: QuizQuestion) { showResult = true; answered += 1; isCorrect = selectedAnswer == q.correctIndex; if isCorrect { score += 1; store.earnXP(5); Haptics.success() } else { shake = true; Haptics.error(); DispatchQueue.main.asyncAfter(deadline: .now()+0.5) { shake = false } } }
    func nextQ() { if currentQuestion < questions.count-1 { currentQuestion += 1; selectedAnswer = nil; showResult = false; isCorrect = false } else { store.saveQuizScore(topic: selectedTopic, percent: pct); finished = true } }
    func resetQuiz() { currentQuestion = 0; selectedAnswer = nil; showResult = false; isCorrect = false; score = 0; answered = 0; finished = false }
}
