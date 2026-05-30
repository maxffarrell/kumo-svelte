export interface KumoFilterOptions {
  locale?: string | string[];
}

export function createKumoFilter(options: KumoFilterOptions = {}) {
  const collator = new Intl.Collator(options.locale, {
    sensitivity: 'base',
    usage: 'search'
  });

  function includes(source: string, query: string) {
    const normalizedSource = source.normalize('NFC');
    const normalizedQuery = query.trim().normalize('NFC');

    if (!normalizedQuery) return true;
    if (normalizedQuery.length > normalizedSource.length) return false;

    for (let index = 0; index <= normalizedSource.length - normalizedQuery.length; index += 1) {
      const slice = normalizedSource.slice(index, index + normalizedQuery.length);
      if (collator.compare(slice, normalizedQuery) === 0) return true;
    }

    return false;
  }

  return {
    contains: includes
  };
}
