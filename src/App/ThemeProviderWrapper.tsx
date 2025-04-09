// ThemeProviderWrapper.tsx
import { useSelector } from "react-redux";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { RootState } from "./Store";

const ThemeProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const colorScheme = useSelector(
    (state: RootState) => state.theme.colorScheme
  );


  const customTheme = createTheme({
    primaryColor: "greenTheme",
    primaryShade: 5,
    colors: {
      greenTheme: [
        "#dcfce7",
        "#bbf7d0",
        "#86efac",
        "#4ade80",
        "#22c55e",
        "#16a34a",
        "#15803d",
        "#166534",
        "#14532d",
        "#052e16",
      ] as [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
      ], // 👈 tuple of 10 strings
    },
    fontFamily: "Poppins, sans-serif",
  });



  return (
    <MantineProvider
      theme={customTheme}
      defaultColorScheme={colorScheme}
      forceColorScheme={colorScheme}
    >
      <Notifications />
      {children}
    </MantineProvider>
  );
};

export default ThemeProviderWrapper;
