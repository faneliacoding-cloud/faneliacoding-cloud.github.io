import SwiftUI

// MARK: - Reference View (Python Reference Table)

struct ReferenceView: View {
    @EnvironmentObject var store: PythonStore
    @State private var searchText = ""
    @State private var selectedCategory = "All"
    @State private var selectedItem: ReferenceItem? = nil
    
    let categories = ["All", "Built-in Function", "Keyword"]
    
    var filtered: [ReferenceItem] {
        store.references.filter { item in
            (selectedCategory == "All" || item.category == selectedCategory) &&
            (searchText.isEmpty || item.keyword.localizedCaseInsensitiveContains(searchText) || item.description.localizedCaseInsensitiveContains(searchText))
        }
    }
    
    var body: some View {
        ZStack {
            Color.w3Dark.ignoresSafeArea()
            VStack(spacing: 0) {
                // Header
                HStack {
                    Text("Python Reference").font(.system(size: 22, weight: .black, design: .rounded)).foregroundColor(.white)
                    Spacer()
                    Text("\(store.references.count) items").font(.system(size: 13, weight: .bold)).foregroundColor(.w3Muted)
                }.padding(.horizontal, 16).padding(.top, 16).padding(.bottom, 12)
                
                // Search
                HStack {
                    Image(systemName: "magnifyingglass").foregroundColor(.w3Muted)
                    TextField("Search...", text: $searchText)
                        .foregroundColor(.white)
                        .autocorrectionDisabled()
                }
                .padding(12).background(Color.w3DarkCard).cornerRadius(10).padding(.horizontal, 16).padding(.bottom, 12)
                
                // Category chips
                HStack(spacing: 8) {
                    ForEach(categories, id: \.self) { cat in
                        Button { selectedCategory = cat } label: {
                            Text(cat).font(.system(size: 12, weight: .semibold))
                                .foregroundColor(selectedCategory == cat ? .white : .w3Muted)
                                .padding(.horizontal, 14).padding(.vertical, 8)
                                .background(selectedCategory == cat ? Color.w3Green : Color.w3DarkCard)
                                .cornerRadius(16)
                        }
                    }
                    Spacer()
                }.padding(.horizontal, 16).padding(.bottom, 12)
                
                // List
                ScrollView(showsIndicators: false) {
                    LazyVStack(spacing: 8) {
                        ForEach(filtered) { item in
                            Button { withAnimation { selectedItem = selectedItem?.id == item.id ? nil : item } } label: {
                                VStack(alignment: .leading, spacing: 8) {
                                    HStack {
                                        Text(item.keyword).font(.system(size: 16, weight: .bold, design: .monospaced)).foregroundColor(.w3Green)
                                        Spacer()
                                        Text(item.category).font(.system(size: 10, weight: .medium)).foregroundColor(.w3Blue).padding(.horizontal, 8).padding(.vertical, 3).background(Color.w3Blue.opacity(0.1)).cornerRadius(8)
                                    }
                                    Text(item.description).font(.system(size: 13)).foregroundColor(.w3Muted).lineLimit(selectedItem?.id == item.id ? nil : 1)
                                    if selectedItem?.id == item.id {
                                        VStack(alignment: .leading, spacing: 6) {
                                            Text("Syntax:").font(.system(size: 12, weight: .bold)).foregroundColor(.w3Yellow)
                                            Text(item.syntax).font(.system(size: 13, design: .monospaced)).foregroundColor(.w3CodeText).padding(10).background(Color.w3CodeBg).cornerRadius(6)
                                            Text("Example:").font(.system(size: 12, weight: .bold)).foregroundColor(.w3Yellow)
                                            Text(item.example).font(.system(size: 13, design: .monospaced)).foregroundColor(.w3CodeText).padding(10).background(Color.w3CodeBg).cornerRadius(6)
                                        }
                                    }
                                }
                                .padding(14).background(Color.w3DarkCard).cornerRadius(10)
                            }.buttonStyle(.plain)
                        }
                    }.padding(.horizontal, 16)
                    Spacer(minLength: 100)
                }
            }
        }
    }
}
