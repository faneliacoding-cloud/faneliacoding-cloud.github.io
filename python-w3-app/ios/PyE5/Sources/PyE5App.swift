import SwiftUI

@main
struct PyE5App: App {
    @StateObject private var store = PythonStore()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(store)
                .preferredColorScheme(.dark)
        }
    }
}
