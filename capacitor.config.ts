import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.gvsoftware.bebidason",
  appName: "Bebidas ON",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1F2937",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#EAB308",
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#1F2937",
    },
  },
  android: {
    buildOptions: {
      keystorePath: "android/app/release.keystore",
      keystoreAlias: "bebidas-on-key",
      releaseType: "APK",
    },
  },
  ios: {
    scheme: "Bebidas ON",
    buildOptions: {
      developmentTeam: "YOUR_TEAM_ID",
      packageType: "app-store",
    },
  },
}

export default config
