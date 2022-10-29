import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const PageAction = ({ sectionName, buttons }) => {
  return (
    <section className={`${sectionName}__action`}>
      {buttons.map((button, i) => {
        return (
          <Button key={i} title={button.title} onClick={button.action}>
            {button.icon}
          </Button>
        );
      })}
    </section>
  );
};

PageAction.propTypes = {
  sectionName: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
      icon: PropTypes.element,
    })
  ).isRequired,
};

export default PageAction;
