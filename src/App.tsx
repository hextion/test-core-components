import React from "react";
import "./App.css";
import { Gap } from "@alfalab/core-components/gap";
import { Typography } from "@alfalab/core-components/typography";
import { BaseOption } from "@alfalab/core-components/select/components/base-option";
import { MaskedInput } from "@alfalab/core-components/masked-input";
import { InputAutocomplete } from "@alfalab/core-components-input-autocomplete";
import { maskitoTransform } from "@maskito/core";
import { Select } from "@alfalab/core-components-select";

function App() {
  const matchOption = (option: any, inputValue: any) =>
    option.content.toLowerCase().includes((inputValue || "").toLowerCase());

  const mask = [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  const cards = [
    {
      key: "Карта 1",
      content: "4035501000000008",
    },
    {
      key: "Карта 2",
      content: "4360000001000005",
    },
  ];

  const CardOption = (props: any) => (
    <BaseOption {...props}>
      <div style={{ padding: "var(--gap-s)" }}>
        <Typography.Text view="component-primary">
          {props.option.content}
        </Typography.Text>
        <Gap size="2xs" />
        <Typography.Text view="primary-small" color="secondary">
          {props.option.key}
        </Typography.Text>
      </div>
    </BaseOption>
  );

  const [value, setValue] = React.useState<string | undefined>("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleInput = (newValue: string) => setValue(newValue);

  const handleChange = ({ selected }: any) => {
    const value = selected ? selected.content : undefined;
    setValue(value);
    requestAnimationFrame(() => {
      const input = inputRef.current;

      if (!input) {
        return;
      }

      const currentValue = input.value;

      return input?.setSelectionRange(currentValue.length, currentValue.length);
    });
  };

  const filteredOptions = cards.filter((option) => matchOption(option, value));

  return (
    <div style={{ width: "320px" }}>
      <Select options={cards} Option={BaseOption} label="Выберите карту" />
      <InputAutocomplete
        size="m"
        options={filteredOptions}
        selected={[]}
        label="Маскированный ввод счёта"
        placeholder="Счёт"
        onInput={handleInput}
        onChange={handleChange}
        value={value ? maskitoTransform(value, { mask }) : undefined}
        Option={CardOption}
        Input={MaskedInput}
        block={true}
        inputProps={{
          ref: inputRef,
          mask,
          clear: true,
          onClear: () => setValue(""),
        }}
      />
    </div>
  );
}

export default App;
