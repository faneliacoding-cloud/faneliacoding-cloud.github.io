import SwiftUI

// MARK: - HomeView

struct HomeView: View {
    @EnvironmentObject var store: PythonStore
    
    var body: some View {
        NavigationStack {
            ZStack {
                Color.w3Dark.ignoresSafeArea()
                
                ScrollView(showsIndicators: false) {
                    VStack(spacing: 0) {
                        
                        // ── Hero Banner ──
                        heroBanner
                        
                        VStack(spacing: 24) {
                            // ── Stats Row ──
                            statsRow
                            
                            // ── Topics Grid ──
                            topicsSection
                            
                            // ── Why Python ──
                            whyPythonSection
                            
                            Spacer(minLength: 100)
                        }
                        .padding(.top, 24)
                    }
                }
            }
            .navigationBarHidden(true)
        }
    }
    
    // MARK: Hero
    
    var heroBanner: some View {
        VStack(spacing: 16) {
            // W3 Logo-style header
            HStack {
                Text("Py")
                    .font(.system(size: 32, weight: .black, design: .rounded))
                    .foregroundColor(.w3Dark)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.w3Green)
                    .cornerRadius(6)
                Text("W3")
                    .font(.system(size: 32, weight: .black, design: .rounded))
                    .foregroundColor(.white)
                Spacer()
                // Streak
                HStack(spacing: 4) {
                    Text("🔥").font(.title3)
                    Text("\(store.streak)")
                        .font(.system(size: 16, weight: .bold))
                        .foregroundColor(.w3Yellow)
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
                .background(Color.white.opacity(0.08))
                .cornerRadius(20)
            }
            .padding(.horizontal, 20)
            
            VStack(spacing: 12) {
                Text("Learn Python")
                    .font(.system(size: 36, weight: .black, design: .rounded))
                    .foregroundColor(.white)
                Text("The World's Most Popular Programming Language")
                    .font(.subheadline)
                    .foregroundColor(.w3Muted)
                    .multilineTextAlignment(.center)
                
                Button(action: {
                    store.selectedTab = 1
                }) {
                    Text("Start Learning →")
                        .font(.system(size: 16, weight: .bold))
                        .foregroundColor(.white)
                        .padding(.horizontal, 32)
                        .padding(.vertical, 14)
                        .background(Color.w3Green)
                        .cornerRadius(30)
                }
                .padding(.top, 8)
            }
            .padding(.vertical, 20)
        }
        .padding(.vertical, 20)
        .background(
            LinearGradient(
                colors: [Color.w3Dark, Color(hex: "1A2332")],
                startPoint: .top,
                endPoint: .bottom
            )
        )
    }
    
    // MARK: Stats
    
    var statsRow: some View {
        HStack(spacing: 12) {
            HomeStatCard(value: "\(store.totalCompleted)", label: "Completed", icon: "checkmark.circle.fill", color: .w3Green)
            HomeStatCard(value: "\(store.totalLessons)", label: "Lessons", icon: "book.fill", color: .w3Blue)
            HomeStatCard(value: "\(store.xp)", label: "XP Earned", icon: "star.fill", color: .w3Yellow)
            HomeStatCard(value: "Lv\(store.userLevel)", label: "Level", icon: "trophy.fill", color: .w3Orange)
        }
        .padding(.horizontal, 16)
    }
    
    // MARK: Topics
    
    var topicsSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Text("Python Topics")
                    .font(.system(size: 20, weight: .bold))
                    .foregroundColor(.white)
                Spacer()
                Text("\(Int(store.overallProgress * 100))%")
                    .font(.system(size: 14, weight: .bold))
                    .foregroundColor(.w3Green)
            }
            .padding(.horizontal, 16)
            
            ForEach(Array(store.topics.enumerated()), id: \.element.id) { index, topic in
                Button(action: {
                    store.currentTopicIndex = index
                    store.selectedTab = 1
                }) {
                    TopicRow(topic: topic, progress: store.progressForTopic(topic.id))
                }
                .buttonStyle(.plain)
            }
            .padding(.horizontal, 16)
        }
    }
    
    // MARK: Why Python
    
    var whyPythonSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Why Python?")
                .font(.system(size: 20, weight: .bold))
                .foregroundColor(.white)
                .padding(.horizontal, 16)
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 12) {
                    FeatureCard(icon: "globe", title: "Web Dev", desc: "Build backends with Django & Flask", color: .w3Green)
                    FeatureCard(icon: "chart.bar.fill", title: "Data Science", desc: "Analyze data with Pandas & NumPy", color: .w3Blue)
                    FeatureCard(icon: "brain", title: "AI / ML", desc: "Build models with TensorFlow", color: .w3Purple)
                    FeatureCard(icon: "terminal.fill", title: "Automation", desc: "Automate tasks & scripts", color: .w3Orange)
                }
                .padding(.horizontal, 16)
            }
        }
    }
}

// MARK: - Sub Components

struct HomeStatCard: View {
    let value: String
    let label: String
    let icon: String
    let color: Color
    
    var body: some View {
        VStack(spacing: 6) {
            Image(systemName: icon)
                .font(.system(size: 18))
                .foregroundColor(color)
            Text(value)
                .font(.system(size: 16, weight: .black, design: .rounded))
                .foregroundColor(.white)
            Text(label)
                .font(.system(size: 10))
                .foregroundColor(.w3Muted)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 14)
        .background(Color.w3DarkCard)
        .cornerRadius(12)
    }
}

struct TopicRow: View {
    let topic: PythonTopic
    let progress: Double
    
    var body: some View {
        HStack(spacing: 14) {
            Image(systemName: topic.icon)
                .font(.system(size: 22))
                .foregroundColor(Color(hex: topic.color))
                .frame(width: 44, height: 44)
                .background(Color(hex: topic.color).opacity(0.12))
                .cornerRadius(10)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(topic.title)
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundColor(.white)
                Text(topic.description)
                    .font(.caption)
                    .foregroundColor(.w3Muted)
            }
            
            Spacer()
            
            // Progress circle
            ZStack {
                Circle()
                    .stroke(Color.white.opacity(0.08), lineWidth: 3)
                Circle()
                    .trim(from: 0, to: progress)
                    .stroke(Color(hex: topic.color), style: StrokeStyle(lineWidth: 3, lineCap: .round))
                    .rotationEffect(.degrees(-90))
                Text("\(Int(progress * 100))%")
                    .font(.system(size: 10, weight: .bold))
                    .foregroundColor(Color(hex: topic.color))
            }
            .frame(width: 40, height: 40)
        }
        .padding(14)
        .background(Color.w3DarkCard)
        .cornerRadius(12)
    }
}

struct FeatureCard: View {
    let icon: String
    let title: String
    let desc: String
    let color: Color
    
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Image(systemName: icon)
                .font(.system(size: 24))
                .foregroundColor(color)
            Text(title)
                .font(.system(size: 14, weight: .bold))
                .foregroundColor(.white)
            Text(desc)
                .font(.system(size: 12))
                .foregroundColor(.w3Muted)
                .lineLimit(2)
        }
        .frame(width: 140)
        .padding(16)
        .background(color.opacity(0.08))
        .overlay(RoundedRectangle(cornerRadius: 12).stroke(color.opacity(0.2), lineWidth: 1))
        .cornerRadius(12)
    }
}
