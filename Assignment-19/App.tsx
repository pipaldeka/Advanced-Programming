// App.js — Digital Counter with Theme Toggle
// React Native Assignment 19

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

export default function App() {

  // --- State ---
  const [count, setCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // --- Counter Handlers ---
  const handleIncrement = () => setCount(prev => prev + 1);

  const handleDecrement = () => {
    if (count > 0) setCount(prev => prev - 1); // floor at 0
  };

  const handleReset = () => setCount(0);

  // --- Theme Toggle ---
  const toggleTheme = () => setIsDarkMode(prev => !prev);

  // Light: warm off-white with terracotta accents
  // Dark:  deep navy/slate with muted sage accents
  const theme = {
    background:  isDarkMode ? '#0f1923' : '#f5f0e8',   // navy vs warm parchment
    text:        isDarkMode ? '#e8dcc8' : '#2b2118',   // warm cream vs dark brown
    subText:     isDarkMode ? '#6b7f8a' : '#9e8b78',   // slate vs muted taupe
    card:        isDarkMode ? '#1a2535' : '#ece5d6',   // deep navy card vs linen
    cardBorder:  isDarkMode ? '#2a3f52' : '#d9cebf',   // subtle border
    btnPrimary:  isDarkMode ? '#4a7c6f' : '#b05c3a',   // sage green vs terracotta
    btnReset:    isDarkMode ? '#1e2f3d' : '#e0d8ca',   // ghost btn
    btnResetTxt: isDarkMode ? '#6b7f8a' : '#7a6a5a',
    btnToggle:   isDarkMode ? '#2a3f52' : '#2b2118',   // inverse of background
    btnToggleTxt:isDarkMode ? '#e8dcc8' : '#f5f0e8',
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Title label */}
      <Text style={[styles.title, { color: theme.subText }]}>counter</Text>

      {/* Counter display */}
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
        <Text style={[styles.counter, { color: theme.text }]}>{count}</Text>
        {/* Small unit label inside card */}
        <Text style={[styles.unit, { color: theme.subText }]}>units</Text>
      </View>

      {/* +  and  − side-by-side */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: theme.btnPrimary }]}
          onPress={handleDecrement}
        >
          <Text style={styles.btnSymbol}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: theme.btnPrimary }]}
          onPress={handleIncrement}
        >
          <Text style={styles.btnSymbol}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Reset — ghost style */}
      <TouchableOpacity
        style={[styles.btnWide, { backgroundColor: theme.btnReset, borderColor: theme.cardBorder, borderWidth: 1 }]}
        onPress={handleReset}
      >
        <Text style={[styles.btnLabel, { color: theme.btnResetTxt }]}>reset</Text>
      </TouchableOpacity>

      {/* Theme toggle */}
      <TouchableOpacity
        style={[styles.btnWide, { backgroundColor: theme.btnToggle }]}
        onPress={toggleTheme}
      >
        <Text style={[styles.btnLabel, { color: theme.btnToggleTxt }]}>
          {isDarkMode ? '○  light mode' : '●  dark mode'}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },

  // "counter" label above the card
  title: {
    fontSize: 11,
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: 20,
    fontWeight: '500',
  },

  // card holding the number
  card: {
    width: 160,
    height: 160,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  counter: {
    fontSize: 52,         // toned down from 72
    fontWeight: '300',    // light weight feels refined
    letterSpacing: -1,
  },

  unit: {
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 4,
    textTransform: 'uppercase',
  },

  // row for +/- buttons
  row: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
  },

  btn: {
    width: 72,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnSymbol: {
    color: '#ffffff',
    fontSize: 20,         // toned down from 22
    fontWeight: '400',
    lineHeight: 22,
  },

  btnWide: {
    width: 158,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  btnLabel: {
    fontSize: 12,         // toned down from 16
    fontWeight: '500',
    letterSpacing: 1.5,
    textTransform: 'lowercase',
  },
});

