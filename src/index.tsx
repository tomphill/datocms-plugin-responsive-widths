import {
  connect,
  IntentCtx,
  RenderFieldExtensionCtx,
} from "datocms-plugin-sdk";
import { render } from "./utils/render";
import ConfigScreen from "./entrypoints/ConfigScreen";
import "datocms-react-ui/styles.css";
import ResponsiveWidths from "./components/ResponsiveWidths";

connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />);
  },
  manualFieldExtensions(ctx: IntentCtx) {
    return [
      {
        id: "responsiveWidths",
        name: "Responsive widths",
        type: "editor",
        fieldTypes: ["json"],
      },
    ];
  },
  renderFieldExtension(fieldExtensionId: string, ctx: RenderFieldExtensionCtx) {
    switch (fieldExtensionId) {
      case "responsiveWidths":
        return render(<ResponsiveWidths ctx={ctx} />);
      default:
        return null;
    }
  },
});
