import Foundation

// MARK: - Data Models

struct PythonTopic: Identifiable, Hashable {
    let id: String
    let title: String
    let icon: String
    let color: String     // hex
    let description: String
    let lessons: [PythonLesson]
}

struct PythonLesson: Identifiable, Hashable {
    let id: String
    let title: String
    let explanation: String
    let codeExample: String
    let tryItCode: String      // pre-filled code for Try It editor
    let expectedOutput: String // simulated output
}

struct QuizQuestion: Identifiable, Hashable {
    let id = UUID()
    let topic: String
    let question: String
    let codeSnippet: String?
    let options: [String]
    let correctIndex: Int
    let explanation: String
}

struct ReferenceItem: Identifiable, Hashable {
    let id = UUID()
    let keyword: String
    let category: String   // "Built-in Function", "Keyword", "Method"
    let syntax: String
    let description: String
    let example: String
}

// MARK: - Python Store

class PythonStore: ObservableObject {
    @Published var completedLessons: Set<String>
    @Published var xp: Int
    @Published var dailyXP: Int
    @Published var streak: Int
    @Published var selectedTab: Int = 0
    @Published var currentTopicIndex: Int = 0
    @Published var quizHighScores: [String: Int]  // topic → best score %
    
    let topics: [PythonTopic] = PythonData.allTopics
    let quizzes: [QuizQuestion] = QuizData.allQuestions
    let references: [ReferenceItem] = ReferenceData.allItems
    
    var totalLessons: Int {
        topics.flatMap(\.lessons).count
    }
    var totalCompleted: Int { completedLessons.count }
    var overallProgress: Double {
        totalLessons == 0 ? 0 : Double(totalCompleted) / Double(totalLessons)
    }
    var userLevel: Int { xp / 100 + 1 }
    var xpProgress: Double { Double(xp % 100) / 100.0 }
    
    init() {
        let d = UserDefaults.standard
        completedLessons = Set(d.stringArray(forKey: "pw3_completed") ?? [])
        xp = d.integer(forKey: "pw3_xp")
        streak = d.integer(forKey: "pw3_streak")
        quizHighScores = (try? JSONDecoder().decode(
            [String: Int].self,
            from: d.data(forKey: "pw3_quizScores") ?? Data()
        )) ?? [:]
        
        // Daily XP reset
        let today = Calendar.current.startOfDay(for: Date())
        if let last = d.object(forKey: "pw3_lastXPDate") as? Date,
           !Calendar.current.isDate(last, inSameDayAs: today) {
            dailyXP = 0
        } else {
            dailyXP = d.integer(forKey: "pw3_dailyXP")
        }
        d.set(today, forKey: "pw3_lastXPDate")
    }
    
    func markComplete(_ lessonId: String) {
        guard !completedLessons.contains(lessonId) else { return }
        completedLessons.insert(lessonId)
        earnXP(10)
        bumpStreak()
    }
    
    func isComplete(_ lessonId: String) -> Bool {
        completedLessons.contains(lessonId)
    }
    
    func progressForTopic(_ topicId: String) -> Double {
        guard let topic = topics.first(where: { $0.id == topicId }) else { return 0 }
        let done = topic.lessons.filter { isComplete($0.id) }.count
        return topic.lessons.isEmpty ? 0 : Double(done) / Double(topic.lessons.count)
    }
    
    func earnXP(_ amount: Int) {
        xp += amount
        dailyXP += amount
        save()
    }
    
    func saveQuizScore(topic: String, percent: Int) {
        let current = quizHighScores[topic] ?? 0
        if percent > current {
            quizHighScores[topic] = percent
        }
        save()
    }
    
    private func bumpStreak() {
        let d = UserDefaults.standard
        let today = Calendar.current.startOfDay(for: Date())
        if let lastDay = d.object(forKey: "pw3_lastLessonDay") as? Date {
            let yesterday = Calendar.current.date(byAdding: .day, value: -1, to: today)!
            if Calendar.current.isDate(lastDay, inSameDayAs: yesterday) {
                streak += 1
            } else if !Calendar.current.isDate(lastDay, inSameDayAs: today) {
                streak = 1
            }
        } else {
            streak = 1
        }
        d.set(today, forKey: "pw3_lastLessonDay")
        save()
    }
    
    private func save() {
        let d = UserDefaults.standard
        d.set(Array(completedLessons), forKey: "pw3_completed")
        d.set(xp, forKey: "pw3_xp")
        d.set(dailyXP, forKey: "pw3_dailyXP")
        d.set(streak, forKey: "pw3_streak")
        if let data = try? JSONEncoder().encode(quizHighScores) {
            d.set(data, forKey: "pw3_quizScores")
        }
    }
}
