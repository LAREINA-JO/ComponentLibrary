import React from 'react';
import type { AutocompleteSyncProps } from './AutocompleteSync';
import AutocompleteSync from './AutocompleteSync';
import type { AutocompleteAsyncProps } from './AutocompleteAsync';
import AutocompleteAsync from './AutocompleteAsync';

type AutocompleteProps = AutocompleteSyncProps | AutocompleteAsyncProps;

function isAutocompleteAsync(
  value: AutocompleteSyncProps | AutocompleteAsyncProps,
): value is AutocompleteAsyncProps {
  return 'async' in value && value['async'] === true;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  ...props
}: AutocompleteProps) => {
  if (isAutocompleteAsync(props)) {
    return <AutocompleteAsync {...props} />;
  }

  return <AutocompleteSync {...props} />;
};

export default Autocomplete;
