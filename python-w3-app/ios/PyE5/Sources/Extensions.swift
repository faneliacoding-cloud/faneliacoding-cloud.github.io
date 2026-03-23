import SwiftUI

// MARK: - Hex Color

extension Color {
    init(hex: String) {
        let h = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: h).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch h.count {
        case 3:
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6:
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8:
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(.sRGB, red: Double(r)/255, green: Double(g)/255, blue: Double(b)/255, opacity: Double(a)/255)
    }
}

// MARK: - W3Schools Color Palette

extension Color {
    static let w3Green     = Color(hex: "04AA6D")  // Primary accent
    static let w3DarkGreen = Color(hex: "059862")  // Hover/pressed
    static let w3Dark      = Color(hex: "282A35")  // Dark backgrounds
    static let w3DarkCard  = Color(hex: "2D2F3A")  // Slightly lighter dark
    static let w3Light     = Color(hex: "F1F1F1")  // Light backgrounds
    static let w3White     = Color(hex: "FFFFFF")  // Pure white
    static let w3CodeBg    = Color(hex: "1E1E2E")  // Code editor background
    static let w3CodeText  = Color(hex: "D4D4D4")  // Code text
    static let w3Yellow    = Color(hex: "FFC107")  // Highlights, stars
    static let w3Blue      = Color(hex: "2196F3")  // Links, secondary
    static let w3Red       = Color(hex: "F44336")  // Errors, wrong
    static let w3Purple    = Color(hex: "9C27B0")  // Category accent
    static let w3Orange    = Color(hex: "FF9800")  // Warning accent
    static let w3Muted     = Color(hex: "879BA6")  // Muted text
    static let w3DarkText  = Color(hex: "1A1A2E")  // Dark text on light
}

// MARK: - Haptics

struct Haptics {
    static func success() {
        UINotificationFeedbackGenerator().notificationOccurred(.success)
    }
    static func error() {
        UINotificationFeedbackGenerator().notificationOccurred(.error)
    }
    static func light() {
        UIImpactFeedbackGenerator(style: .light).impactOccurred()
    }
    static func medium() {
        UIImpactFeedbackGenerator(style: .medium).impactOccurred()
    }
}

// MARK: - W3 Card Modifier

struct W3CardModifier: ViewModifier {
    var dark: Bool = true
    var cornerRadius: CGFloat = 12

    func body(content: Content) -> some View {
        content
            .background(dark ? Color.w3DarkCard : Color.w3White)
            .cornerRadius(cornerRadius)
            .shadow(color: .black.opacity(dark ? 0.3 : 0.08), radius: 6, x: 0, y: 3)
    }
}

extension View {
    func w3Card(dark: Bool = true, cornerRadius: CGFloat = 12) -> some View {
        modifier(W3CardModifier(dark: dark, cornerRadius: cornerRadius))
    }
}

// MARK: - W3 Button Style

struct W3ButtonStyle: ButtonStyle {
    var color: Color = .w3Green
    var fullWidth: Bool = false

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 16, weight: .bold))
            .foregroundColor(.white)
            .padding(.horizontal, 24)
            .padding(.vertical, 14)
            .frame(maxWidth: fullWidth ? .infinity : nil)
            .background(configuration.isPressed ? color.opacity(0.8) : color)
            .cornerRadius(8)
            .scaleEffect(configuration.isPressed ? 0.97 : 1.0)
            .animation(.spring(response: 0.2), value: configuration.isPressed)
    }
}

// MARK: - Confetti View

struct ConfettiView: View {
    @State private var particles: [ConfettiParticle] = []
    let colors: [Color] = [.w3Green, .w3Yellow, .w3Blue, .w3Orange, .w3Purple]
    let timer = Timer.publish(every: 0.03, on: .main, in: .common).autoconnect()

    struct ConfettiParticle: Identifiable {
        let id = UUID()
        var x: CGFloat
        var y: CGFloat
        var dx: CGFloat
        var dy: CGFloat
        var color: Color
        var opacity: Double
    }

    var body: some View {
        TimelineView(.animation) { _ in
            Canvas { ctx, size in
                for p in particles {
                    ctx.opacity = p.opacity
                    ctx.fill(
                        Path(ellipseIn: CGRect(x: p.x - 5, y: p.y - 5, width: 10, height: 6)),
                        with: .color(p.color)
                    )
                }
            }
        }
        .onAppear { spawnParticles() }
        .onReceive(timer) { _ in
            for i in particles.indices {
                particles[i].x += particles[i].dx
                particles[i].y += particles[i].dy
                particles[i].dy += 0.15 // gravity
                particles[i].opacity -= 0.008
            }
            particles.removeAll { $0.opacity <= 0 }
        }
        .allowsHitTesting(false)
    }

    func spawnParticles() {
        particles = (0..<70).map { _ in
            ConfettiParticle(
                x: CGFloat.random(in: 20...380),
                y: CGFloat.random(in: -30...10),
                dx: CGFloat.random(in: -2...2),
                dy: CGFloat.random(in: -5 ... -1),
                color: colors.randomElement()!,
                opacity: Double.random(in: 0.7...1.0)
            )
        }
    }
}

// MARK: - Syntax Highlight (Simple)

struct CodeBlockView: View {
    let code: String
    
    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            Text(code)
                .font(.system(.body, design: .monospaced))
                .foregroundColor(.w3CodeText)
                .padding(16)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color.w3CodeBg)
        .cornerRadius(8)
        .overlay(
            HStack {
                Spacer()
                VStack {
                    Text("Python")
                        .font(.caption2)
                        .fontWeight(.bold)
                        .foregroundColor(.w3Muted)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.white.opacity(0.05))
                        .cornerRadius(4)
                    Spacer()
                }
            }
            .padding(8)
        )
    }
}
