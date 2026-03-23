import SwiftUI

// MARK: - ContentView (Tab Bar)

struct ContentView: View {
    @EnvironmentObject var store: PythonStore
    
    var body: some View {
        TabView(selection: $store.selectedTab) {
            HomeView()
                .tabItem { Label("Home", systemImage: "house.fill") }
                .tag(0)
            TutorialListView()
                .tabItem { Label("Tutorials", systemImage: "book.fill") }
                .tag(1)
            TryItView()
                .tabItem { Label("Try It", systemImage: "chevron.left.forwardslash.chevron.right") }
                .tag(2)
            ExerciseView()
                .tabItem { Label("Exercises", systemImage: "brain.head.profile") }
                .tag(3)
            ProfileView()
                .tabItem { Label("Profile", systemImage: "person.fill") }
                .tag(4)
        }
        .tint(.w3Green)
    }
}
