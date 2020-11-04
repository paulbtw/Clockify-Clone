import {
  Button,
  Checkbox,
  FormHelperText,
  Link,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import validate from "validate.js";
import clsx from "clsx";
import { register } from "../../../../actions/register";
import { connect } from "react-redux";

interface RegisterFormProps {
  className: string;
  onRegister: (email: string, password: string, policy: boolean) => void;
}

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 6,
      maximum: 128,
    },
  },
  policy: {
    presence: { allowEmpty: false, message: "is required" },
    inclusion: {
      within: [true],
      message: "is required",
    },
  },
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  fields: {
    margin: theme.spacing(-1),
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      flexGrow: 1,
      margin: theme.spacing(1),
    },
  },
  policy: {
    display: "flex",
    alignItems: "center",
  },
  policyCheckbox: {
    marginLeft: "-14px",
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
}));

const RegisterForm: React.FC<RegisterFormProps> = ({
  className,
  onRegister,
}) => {
  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: { email: "", password: "", policy: false },
    touched: {},
    errors: {} as {
      email?: string[];
      password?: string[];
      policy?: string[];
    },
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (
    event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    event.persist();
    const savedEvent = event.target as HTMLTextAreaElement | HTMLInputElement;
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [savedEvent.name]:
          savedEvent.type === "checkbox"
            ? // @ts-ignore
              savedEvent.checked
            : savedEvent.value,
      },
      touched: {
        ...formState.touched,
        [savedEvent.name]: true,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onRegister(
      formState.values.email,
      formState.values.password,
      formState.values.policy
    );
  };

  const hasError = (field: string) =>
    // @ts-ignore
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <form className={clsx(classes.root, className)} onSubmit={handleSubmit}>
      <div className={classes.fields}>
        <TextField
          error={hasError("email")}
          fullWidth
          // @ts-ignore
          helperText={hasError("email") ? formState.errors.email[0] : null}
          label="Email address"
          name="email"
          onChange={(event) => handleChange(event)}
          value={formState.values.email || ""}
          variant="outlined"
        />
        <TextField
          error={hasError("password")}
          fullWidth
          helperText={
            // @ts-ignore
            hasError("password") ? formState.errors.password[0] : null
          }
          label="Password"
          name="password"
          onChange={(event) => handleChange(event)}
          type="password"
          value={formState.values.password || ""}
          variant="outlined"
        />
        <div>
          <div className={classes.policy}>
            <Checkbox
              checked={formState.values.policy || false}
              className={classes.policyCheckbox}
              color="primary"
              name="policy"
              onChange={(event) => handleChange(event)}
            />
            <Typography color="textSecondary" variant="body1">
              I have read the{" "}
              <Link
                color="secondary"
                component={RouterLink}
                to="#"
                underline="hover"
                variant="body1"
              >
                Terms and Conditions
              </Link>
            </Typography>
          </div>
          {hasError("policy") && (
            // @ts-ignore
            <FormHelperText error>{formState.errors.policy[0]}</FormHelperText>
          )}
        </div>
      </div>
      <Button
        className={classes.submitButton}
        color="secondary"
        disabled={!formState.isValid}
        size="large"
        type="submit"
        variant="contained"
      >
        Create account
      </Button>
    </form>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onRegister: (email: string, password: string, policy: boolean) =>
      dispatch(register(email, password, policy)),
  };
};

export default connect(null, mapDispatchToProps)(RegisterForm);
