import SwiftUI

@main
struct PyW3App: App {
    @StateObject private var store = PythonStore()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(store)
                .preferredColorScheme(.dark)
        }
    }
}
