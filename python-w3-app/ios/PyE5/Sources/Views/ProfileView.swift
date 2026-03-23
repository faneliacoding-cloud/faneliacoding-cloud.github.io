import SwiftUI

// MARK: - Profile View

struct ProfileView: View {
    @EnvironmentObject var store: PythonStore
    @State private var showReset = false
    
    var body: some View {
        NavigationStack {
            ZStack {
                Color.w3Dark.ignoresSafeArea()
                ScrollView(showsIndicators: false) {
                    VStack(spacing: 24) {
                        // Avatar & Level
                        VStack(spacing: 16) {
                            ZStack {
                                Circle().fill(Color.w3Green.opacity(0.15)).frame(width: 100, height: 100)
                                Circle().stroke(Color.w3Green, lineWidth: 3).frame(width: 100, height: 100)
                                Text("🐍").font(.system(size: 44))
                            }
                            Text("Python Learner").font(.system(size: 22, weight: .black, design: .rounded)).foregroundColor(.white)
                            HStack(spacing: 16) {
                                ProfileBadge(icon: "star.fill", value: "Lv \(store.userLevel)", color: .w3Yellow)
                                ProfileBadge(icon: "flame.fill", value: "\(store.streak) day", color: .w3Orange)
                                ProfileBadge(icon: "trophy.fill", value: "\(store.xp) XP", color: .w3Green)
                            }
                        }.padding(.top, 30)
                        
                        // Overall progress
                        VStack(spacing: 12) {
                            HStack {
                                Text("Overall Progress").font(.system(size: 16, weight: .bold)).foregroundColor(.white)
                                Spacer()
                                Text("\(Int(store.overallProgress * 100))%").font(.system(size: 16, weight: .bold)).foregroundColor(.w3Green)
                            }
                            GeometryReader { g in
                                ZStack(alignment: .leading) {
                                    RoundedRectangle(cornerRadius: 6).fill(Color.white.opacity(0.06)).frame(height: 10)
                                    RoundedRectangle(cornerRadius: 6).fill(Color.w3Green).frame(width: g.size.width * store.overallProgress, height: 10)
                                }
                            }.frame(height: 10)
                            Text("\(store.totalCompleted) of \(store.totalLessons) lessons completed").font(.caption).foregroundColor(.w3Muted)
                        }.padding(20).background(Color.w3DarkCard).cornerRadius(14).padding(.horizontal, 16)
                        
                        // XP Progress
                        VStack(spacing: 12) {
                            HStack {
                                Text("Level Progress").font(.system(size: 16, weight: .bold)).foregroundColor(.white)
                                Spacer()
                                Text("Level \(store.userLevel)").font(.system(size: 14, weight: .bold)).foregroundColor(.w3Yellow)
                            }
                            GeometryReader { g in
                                ZStack(alignment: .leading) {
                                    RoundedRectangle(cornerRadius: 6).fill(Color.white.opacity(0.06)).frame(height: 8)
                                    RoundedRectangle(cornerRadius: 6).fill(Color.w3Yellow).frame(width: g.size.width * store.xpProgress, height: 8)
                                }
                            }.frame(height: 8)
                            Text("\(store.xp % 100)/100 XP to next level").font(.caption).foregroundColor(.w3Muted)
                        }.padding(20).background(Color.w3DarkCard).cornerRadius(14).padding(.horizontal, 16)
                        
                        // Topic progress
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Topics").font(.system(size: 16, weight: .bold)).foregroundColor(.white)
                            ForEach(store.topics) { t in
                                HStack(spacing: 12) {
                                    Image(systemName: t.icon).font(.system(size: 16)).foregroundColor(Color(hex: t.color)).frame(width: 32, height: 32).background(Color(hex: t.color).opacity(0.12)).cornerRadius(8)
                                    VStack(alignment: .leading, spacing: 4) {
                                        Text(t.title).font(.system(size: 14, weight: .semibold)).foregroundColor(.white)
                                        GeometryReader { g in
                                            let p = store.progressForTopic(t.id)
                                            ZStack(alignment: .leading) {
                                                RoundedRectangle(cornerRadius: 3).fill(Color.white.opacity(0.06)).frame(height: 4)
                                                RoundedRectangle(cornerRadius: 3).fill(Color(hex: t.color)).frame(width: g.size.width * p, height: 4)
                                            }
                                        }.frame(height: 4)
                                    }
                                    Text("\(Int(store.progressForTopic(t.id) * 100))%").font(.system(size: 12, weight: .bold)).foregroundColor(Color(hex: t.color)).frame(width: 36)
                                }
                            }
                        }.padding(20).background(Color.w3DarkCard).cornerRadius(14).padding(.horizontal, 16)
                        
                        // Reference & Reset
                        NavigationLink(destination: ReferenceView().environmentObject(store)) {
                            HStack {
                                Image(systemName: "book.closed.fill").foregroundColor(.w3Blue)
                                Text("Python Reference").font(.system(size: 15, weight: .semibold)).foregroundColor(.white)
                                Spacer()
                                Image(systemName: "chevron.right").foregroundColor(.w3Muted)
                            }.padding(16).background(Color.w3DarkCard).cornerRadius(12)
                        }.padding(.horizontal, 16)
                        
                        Button { showReset = true } label: {
                            Text("Reset Progress").font(.system(size: 14, weight: .medium)).foregroundColor(.w3Red)
                        }
                        .alert("Reset All Progress?", isPresented: $showReset) {
                            Button("Cancel", role: .cancel) {}
                            Button("Reset", role: .destructive) {
                                store.completedLessons.removeAll()
                                store.xp = 0; store.dailyXP = 0; store.streak = 0
                                store.quizHighScores.removeAll()
                                let d = UserDefaults.standard
                                d.removeObject(forKey: "pe5_completed"); d.removeObject(forKey: "pe5_xp")
                                d.removeObject(forKey: "pe5_streak"); d.removeObject(forKey: "pe5_quizScores")
                                d.removeObject(forKey: "pe5_dailyXP"); d.removeObject(forKey: "pe5_lastLessonDay")
                                d.removeObject(forKey: "pe5_lastXPDate")
                            }
                        } message: { Text("This will erase all your progress, XP, and quiz scores.") }
                        
                        Spacer(minLength: 100)
                    }
                }
            }.navigationBarHidden(true)
        }
    }
}

struct ProfileBadge: View {
    let icon: String; let value: String; let color: Color
    var body: some View {
        HStack(spacing: 6) {
            Image(systemName: icon).font(.system(size: 14)).foregroundColor(color)
            Text(value).font(.system(size: 13, weight: .bold)).foregroundColor(.white)
        }.padding(.horizontal, 12).padding(.vertical, 8).background(color.opacity(0.1)).cornerRadius(20)
    }
}
