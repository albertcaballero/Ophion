import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { algorithms } from "./algorithms";

export default function App() {
  const [input, setInput] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [outputVisible, setOutputVisible] = useState(false);

  const selected = algorithms[selectedIndex];
  const output = input ? selected.transform(input.trim()) : "";

  const handleCopy = async () => {
    if (!output) return;
    await Clipboard.setStringAsync(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Ophion</Text>
        </View>

        {/* Input */}
        <View style={styles.section}>
          <Text style={styles.label}>INPUT</Text>
          <TextInput
            style={styles.input}
            placeholder="Type or paste text here…"
            placeholderTextColor="#555"
            value={input}
            onChangeText={setInput}
            textAlignVertical="top"
          />
        </View>

        {/* Dropdown */}
        <View style={styles.section}>
          <Text style={styles.label}>TRANSFORMATION</Text>
          <TouchableOpacity
            style={styles.dropdownTrigger}
            onPress={() => setDropdownOpen((v) => !v)}
            activeOpacity={0.85}
          >
            <Text style={styles.dropdownTriggerText}>{selected.label}</Text>
            <Text style={styles.dropdownArrow}>{dropdownOpen ? "▲" : "▼"}</Text>
          </TouchableOpacity>

          {dropdownOpen && (
            <View style={styles.dropdownList}>
              {algorithms.map((algo, i) => (
                <TouchableOpacity
                  key={algo.label}
                  style={[
                    styles.dropdownItem,
                    i === selectedIndex && styles.dropdownItemActive,
                  ]}
                  onPress={() => {
                    setSelectedIndex(i);
                    setDropdownOpen(false);
                  }}
                  activeOpacity={0.75}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      i === selectedIndex && styles.dropdownItemTextActive,
                    ]}
                  >
                    {algo.label}
                  </Text>
                  {i === selectedIndex && (
                    <Text style={styles.dropdownCheck}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Output */}
        <View style={styles.section}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>OUTPUT</Text>
            <TouchableOpacity
              onPress={() => setOutputVisible((v) => !v)}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.eyeIcon}>{outputVisible ? "🙈" : "👁️"}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.outputBox}>
            <Text style={styles.outputText} selectable={outputVisible}>
              {!output ? (
                <Text style={styles.outputPlaceholder}>Result will appear here</Text>
              ) : outputVisible ? (
                output
              ) : (
                <Text style={styles.outputDots}>{"•".repeat(Math.min(output.length, 32))}</Text>
              )}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.copyButton, !output && styles.copyButtonDisabled]}
            onPress={handleCopy}
            activeOpacity={0.8}
            disabled={!output}
          >
            <Text style={styles.copyButtonText}>
              {copied ? "✓  Copied!" : "Copy to Clipboard"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
  scroll: {
    flex: 1,
  },
  container: {
    padding: 24,
    paddingTop: Platform.OS === "android" ? 48 : 60,
    paddingBottom: 48,
    gap: 28,
  },
  header: {
    marginBottom: 4,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#f0f0f0",
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    letterSpacing: 0.3,
  },
  section: {
    gap: 10,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#e8ff47",
    letterSpacing: 2,
  },
  eyeIcon: {
    fontSize: 18,
  },
  input: {
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#f0f0f0",
    lineHeight: 24,
  },
  dropdownTrigger: {
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownTriggerText: {
    fontSize: 16,
    color: "#f0f0f0",
    fontWeight: "600",
  },
  dropdownArrow: {
    fontSize: 11,
    color: "#666",
  },
  dropdownList: {
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 12,
    overflow: "hidden",
  },
  dropdownItem: {
    padding: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  dropdownItemActive: {
    backgroundColor: "#1e2500",
  },
  dropdownItemText: {
    fontSize: 15,
    color: "#aaa",
  },
  dropdownItemTextActive: {
    color: "#e8ff47",
    fontWeight: "600",
  },
  dropdownCheck: {
    color: "#e8ff47",
    fontSize: 14,
    fontWeight: "700",
  },
  outputBox: {
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
  },
  outputText: {
    fontSize: 16,
    color: "#f0f0f0",
    lineHeight: 24,
  },
  outputDots: {
    fontSize: 20,
    color: "#666",
    letterSpacing: 4,
  },
  outputPlaceholder: {
    color: "#444",
    fontStyle: "italic",
  },
  copyButton: {
    backgroundColor: "#e8ff47",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  copyButtonDisabled: {
    backgroundColor: "#2a2a2a",
  },
  copyButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0f0f0f",
    letterSpacing: 0.3,
  },
});