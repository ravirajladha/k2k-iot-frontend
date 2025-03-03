import React from 'react';
import { CopilotPopup } from '@copilotkit/react-ui';

const CopilotFeature = () => {
  return (
    <div className="copilot-container  rounded-md">
      <CopilotPopup
        labels={{
          title: 'Kods AI Assitant',
          initial: 'Welcome to Kods Assistant. Ask us for any problem in daily-life.',

        }}
      />
    </div>
  );
};

export default CopilotFeature;