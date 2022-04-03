import { RenderFieldExtensionCtx } from "datocms-plugin-sdk";
import { Canvas, TextField } from "datocms-react-ui";
import { FC, useState } from "react";
import get from "lodash/get";
import "./style.css";

type Props = {
  ctx: RenderFieldExtensionCtx;
};

const ResponsiveWidths: FC<Props> = ({ ctx }) => {
  const stringifiedValues = get(
    ctx?.formValues,
    ctx?.fieldPath || ""
  ) as string;
  const initialValue = stringifiedValues ? JSON.parse(stringifiedValues) : {};
  const [large, setLarge] = useState(initialValue?.large || "");
  const [medium, setMedium] = useState(initialValue?.medium || "");
  const [small, setSmall] = useState(initialValue?.small || "");

  // get all column values
  const fieldPathSplit = ctx.fieldPath.split(".");
  const currentColumnIndex = fieldPathSplit[fieldPathSplit.length - 2];

  const columnsPath = fieldPathSplit
    .slice(0, fieldPathSplit.length - 2)
    .join(".");
  const columns: any[] = (get(ctx.formValues, columnsPath) || []) as any[];

  return (
    <Canvas ctx={ctx}>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5 }}
      >
        <div>
          <TextField
            name="large"
            id="large"
            label="Large screens"
            value={large}
            placeholder="Large"
            onChange={(newValue: string) => {
              if (!newValue || !isNaN(parseInt(newValue))) {
                setLarge(newValue);
                ctx.setFieldValue(
                  ctx.fieldPath,
                  JSON.stringify({
                    large: newValue,
                    medium,
                    small,
                  })
                );
              }
            }}
          />
        </div>
        <div>
          <TextField
            name="medium"
            id="medium"
            label="Medium screens"
            value={medium}
            placeholder="Medium"
            onChange={(newValue: string) => {
              if (!newValue || !isNaN(parseInt(newValue))) {
                setMedium(newValue);
                ctx.setFieldValue(
                  ctx.fieldPath,
                  JSON.stringify({
                    large,
                    medium: newValue,
                    small,
                  })
                );
              }
            }}
          />
        </div>
        <div>
          <TextField
            name="small"
            id="small"
            label="Small screens"
            value={small}
            placeholder="Small"
            onChange={(newValue: string) => {
              if (!newValue || !isNaN(parseInt(newValue))) {
                setSmall(newValue);
                ctx.setFieldValue(
                  ctx.fieldPath,
                  JSON.stringify({
                    large,
                    medium,
                    small: newValue,
                  })
                );
              }
            }}
          />
        </div>
        <div>
          <div
            className="device"
            style={{
              height: 20,
              width: 50,
            }}
          >
            {columns.map((col, index) => {
              const colWidth = col.widths
                ? JSON.parse(col.widths)?.large || 0
                : 0;

              return colWidth ? (
                <div
                  key={col.itemId}
                  className={`col ${
                    index === parseInt(currentColumnIndex || "0")
                      ? "col-active"
                      : ""
                  }`}
                  style={{
                    width: `calc(${
                      col.widths ? JSON.parse(col.widths)?.large || 0 : 0
                    }% - 2px)`,
                  }}
                />
              ) : null;
            })}
            <div className="device-button" />
          </div>
        </div>
        <div>
          <div
            className="device"
            style={{
              height: 20,
              width: 35,
            }}
          >
            {columns.map((col, index) => {
              const colWidth = col.widths
                ? JSON.parse(col.widths)?.medium || 0
                : 0;

              return colWidth ? (
                <div
                  key={col.itemId}
                  className={`col ${
                    index === parseInt(currentColumnIndex || "0")
                      ? "col-active"
                      : ""
                  }`}
                  style={{
                    width: `calc(${
                      col.widths ? JSON.parse(col.widths)?.medium || 0 : 0
                    }% - 2px)`,
                  }}
                />
              ) : null;
            })}
            <div className="device-button" />
          </div>
        </div>
        <div>
          <div
            className="device"
            style={{
              height: 20,
              width: 20,
            }}
          >
            {columns.map((col, index) => {
              const colWidth = col.widths
                ? JSON.parse(col.widths)?.small || 0
                : 0;

              return colWidth ? (
                <div
                  key={col.itemId}
                  className={`col ${
                    index === parseInt(currentColumnIndex || "0")
                      ? "col-active"
                      : ""
                  }`}
                  style={{
                    width: `calc(${
                      col.widths ? JSON.parse(col.widths)?.small || 0 : 0
                    }% - 2px)`,
                  }}
                />
              ) : null;
            })}
            <div className="device-button" />
          </div>
        </div>
      </div>
    </Canvas>
  );
};

export default ResponsiveWidths;
