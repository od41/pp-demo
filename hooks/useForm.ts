import { useState } from "react";

const useForm = (initialData = {}) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setError = (newError: any) => {
    setErrors({ ...errors, ...newError });
  };

  const resetErrors = () => setErrors({});

  const submit = async (callback: any) => {
    try {
      setSubmitting(true);
      await callback(data);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setData(initialData);
  };

  return {
    data,
    setData,
    submit,
    submitting,
    reset,
    errors,
    setError,
    resetErrors,
  };
};

export default useForm;
