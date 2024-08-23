import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TypeUtils from '../utils/TypeUtils';

const useShowHeader = (defaultValue: boolean = true) => {
  const [searchParams] = useSearchParams();
  const [showHeader, setShowHeader] = useState<boolean>(defaultValue);

  useEffect(() => {
    const showHeaderParam = searchParams.get('showHeader');
    setShowHeader(TypeUtils.getBool(showHeaderParam, defaultValue));
  }, [searchParams, defaultValue]);

  return showHeader;
};

export default useShowHeader;
