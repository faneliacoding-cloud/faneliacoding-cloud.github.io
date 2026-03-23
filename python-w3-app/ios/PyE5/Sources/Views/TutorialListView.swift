import SwiftUI

// MARK: - Tutorial List View (Sidebar-style topic navigation)

struct TutorialListView: View {
    @EnvironmentObject var store: PythonStore
    @State private var selectedTopicIndex: Int = 0
    
    var body: some View {
        NavigationStack {
            ZStack {
                Color.w3Dark.ignoresSafeArea()
                
                VStack(spacing: 0) {
                    // ── Header bar ──
                    headerBar
                    
                    // ── Topic chips ──
                    topicChips
                    
                    // ── Lessons list ──
                    lessonsList
                }
            }
            .navigationBarHidden(true)
        }
        .onAppear {
            selectedTopicIndex = store.currentTopicIndex
        }
        .onChange(of: store.currentTopicIndex) { _, newValue in
            selectedTopicIndex = newValue
        }
    }
    
    var headerBar: some View {
        HStack {
            Text("Python Tutorial")
                .font(.system(size: 24, weight: .black, design: .rounded))
                .foregroundColor(.white)
            Spacer()
            // Progress
            Text("\(store.totalCompleted)/\(store.totalLessons)")
                .font(.system(size: 14, weight: .bold))
                .foregroundColor(.w3Green)
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
                .background(Color.w3Green.opacity(0.12))
                .cornerRadius(16)
        }
        .padding(.horizontal, 16)
        .padding(.top, 16)
        .padding(.bottom, 12)
    }
    
    var topicChips: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(Array(store.topics.enumerated()), id: \.element.id) { index, topic in
                    Button(action: {
                        withAnimation(.easeInOut(duration: 0.2)) {
                            selectedTopicIndex = index
                        }
                    }) {
                        HStack(spacing: 6) {
                            Image(systemName: topic.icon)
                                .font(.system(size: 12))
                            Text(topic.title)
                                .font(.system(size: 13, weight: .semibold))
                        }
                        .foregroundColor(selectedTopicIndex == index ? .white : .w3Muted)
                        .padding(.horizontal, 14)
                        .padding(.vertical, 10)
                        .background(selectedTopicIndex == index ? Color.w3Green : Color.w3DarkCard)
                        .cornerRadius(20)
                    }
                }
            }
            .padding(.horizontal, 16)
        }
        .padding(.bottom, 16)
    }
    
    var currentTopic: PythonTopic {
        store.topics[selectedTopicIndex]
    }
    
    var lessonsList: some View {
        ScrollView(showsIndicators: false) {
            VStack(spacing: 0) {
                // Topic header card
                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        Image(systemName: currentTopic.icon)
                            .font(.system(size: 28))
                            .foregroundColor(Color(hex: currentTopic.color))
                        VStack(alignment: .leading, spacing: 2) {
                            Text(currentTopic.title)
                                .font(.system(size: 20, weight: .bold))
                                .foregroundColor(.white)
                            Text(currentTopic.description)
                                .font(.caption)
                                .foregroundColor(.w3Muted)
                        }
                        Spacer()
                    }
                    
                    // Progress bar
                    let prog = store.progressForTopic(currentTopic.id)
                    VStack(alignment: .leading, spacing: 4) {
                        HStack {
                            Text("Progress")
                                .font(.caption)
                                .foregroundColor(.w3Muted)
                            Spacer()
                            Text("\(Int(prog * 100))%")
                                .font(.caption)
                                .fontWeight(.bold)
                                .foregroundColor(Color(hex: currentTopic.color))
                        }
                        GeometryReader { geo in
                            ZStack(alignment: .leading) {
                                RoundedRectangle(cornerRadius: 4)
                                    .fill(Color.white.opacity(0.06))
                                    .frame(height: 6)
                                RoundedRectangle(cornerRadius: 4)
                                    .fill(Color(hex: currentTopic.color))
                                    .frame(width: geo.size.width * prog, height: 6)
                            }
                        }
                        .frame(height: 6)
                    }
                }
                .padding(20)
                .background(Color(hex: currentTopic.color).opacity(0.06))
                .cornerRadius(16)
                .padding(.horizontal, 16)
                .padding(.bottom, 16)
                
                // Lesson rows
                ForEach(Array(currentTopic.lessons.enumerated()), id: \.element.id) { index, lesson in
                    NavigationLink(destination: LessonDetailView(topic: currentTopic, lessonIndex: index)) {
                        LessonRow(
                            lesson: lesson,
                            index: index,
                            isCompleted: store.isComplete(lesson.id),
                            color: Color(hex: currentTopic.color)
                        )
                    }
                    .buttonStyle(.plain)
                }
                .padding(.horizontal, 16)
                
                Spacer(minLength: 100)
            }
        }
    }
}

// MARK: - Lesson Row

struct LessonRow: View {
    let lesson: PythonLesson
    let index: Int
    let isCompleted: Bool
    let color: Color
    
    var body: some View {
        HStack(spacing: 14) {
            // Left indicator line
            VStack(spacing: 0) {
                if index > 0 {
                    Rectangle()
                        .fill(isCompleted ? color.opacity(0.4) : Color.white.opacity(0.06))
                        .frame(width: 2, height: 16)
                }
                
                ZStack {
                    Circle()
                        .fill(isCompleted ? color : Color.w3DarkCard)
                        .frame(width: 32, height: 32)
                    Circle()
                        .stroke(isCompleted ? color : Color.white.opacity(0.12), lineWidth: 2)
                        .frame(width: 32, height: 32)
                    
                    if isCompleted {
                        Image(systemName: "checkmark")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(.white)
                    } else {
                        Text("\(index + 1)")
                            .font(.system(size: 13, weight: .bold))
                            .foregroundColor(.w3Muted)
                    }
                }
                
                Rectangle()
                    .fill(Color.white.opacity(0.06))
                    .frame(width: 2, height: 16)
            }
            
            // Content
            VStack(alignment: .leading, spacing: 4) {
                Text(lesson.title)
                    .font(.system(size: 15, weight: .semibold))
                    .foregroundColor(.white)
                Text(lesson.explanation.prefix(60) + "...")
                    .font(.system(size: 12))
                    .foregroundColor(.w3Muted)
                    .lineLimit(1)
            }
            
            Spacer()
            
            Image(systemName: "chevron.right")
                .font(.system(size: 12, weight: .semibold))
                .foregroundColor(.w3Muted)
        }
        .padding(.vertical, 8)
    }
}
