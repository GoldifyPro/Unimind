import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Emergency, 
  Phone, 
  LocalHospital, 
  School,
  Person,
  Language,
  AccessTime 
} from '@mui/icons-material';
import '../styles/glassmorphism.css';

const EmergencyHelp = () => {
  const { t } = useTranslation();
  
  const emergencyContacts = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 free and confidential support",
      icon: <Phone />,
      color: "from-red-500 to-orange-500"
    },
    {
      name: "Crisis Text Line",
      number: "741741",
      description: "Text HOME to connect with a crisis counselor",
      icon: <Phone />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Emergency Services",
      number: "911",
      description: "For immediate life-threatening emergencies",
      icon: <Emergency />,
      color: "from-red-600 to-red-500"
    }
  ];
  
  const universityResources = [
    {
      university: "Stanford University",
      counseling: "(650) 723-3785",
      emergency: "(650) 329-9911",
      website: "vaden.stanford.edu"
    },
    {
      university: "MIT",
      counseling: "(617) 253-2916",
      emergency: "(617) 253-1212",
      website: "medical.mit.edu"
    },
    {
      university: "UC Berkeley",
      counseling: "(510) 642-9494",
      emergency: "(510) 642-3333",
      website: "uhs.berkeley.edu"
    }
  ];
  
  const copingStrategies = [
    "Breathe deeply: Inhale for 4 seconds, hold for 4, exhale for 6",
    "Use grounding techniques: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste",
    "Reach out to a trusted friend or family member",
    "Practice mindfulness or meditation",
    "Take a break from screens and go for a walk"
  ];
  
  return (
    <div className="space-y-6 h-full overflow-y-auto">
      {/* Emergency Alert */}
      <div className="glass-card-gradient border-l-4 border-red-500 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
            <Emergency className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Urgent Help Needed?</h2>
            <p className="text-gray-300">
              If you're in immediate danger or having thoughts of harming yourself, please contact emergency services immediately.
            </p>
          </div>
        </div>
      </div>
      
      {/* Emergency Contacts */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Emergency Contacts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="glass-card-light p-4 rounded-xl">
              <div className={`w-10 h-10 bg-gradient-to-br ${contact.color} rounded-lg flex items-center justify-center mb-3`}>
                <div className="text-white">
                  {contact.icon}
                </div>
              </div>
              <h4 className="text-lg font-bold text-white mb-1">
                {contact.name}
              </h4>
              <div className="text-2xl font-bold text-white mb-2">
                {contact.number}
              </div>
              <p className="text-gray-300 text-sm">
                {contact.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* University Resources */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">University Counseling Centers</h3>
        <div className="glass-card-dark rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-gray-300 font-medium">
                    <div className="flex items-center space-x-2">
                      <School />
                      <span>University</span>
                    </div>
                  </th>
                  <th className="text-left p-4 text-gray-300 font-medium">
                    <div className="flex items-center space-x-2">
                      <Person />
                      <span>Counseling</span>
                    </div>
                  </th>
                  <th className="text-left p-4 text-gray-300 font-medium">
                    <div className="flex items-center space-x-2">
                      <Emergency />
                      <span>Emergency</span>
                    </div>
                  </th>
                  <th className="text-left p-4 text-gray-300 font-medium">
                    <div className="flex items-center space-x-2">
                      <Language />
                      <span>Website</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {universityResources.map((resource, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4 text-white font-medium">
                      {resource.university}
                    </td>
                    <td className="p-4">
                      <a 
                        href={`tel:${resource.counseling}`}
                        className="text-purple-300 hover:text-purple-200"
                      >
                        {resource.counseling}
                      </a>
                    </td>
                    <td className="p-4">
                      <a 
                        href={`tel:${resource.emergency}`}
                        className="text-red-300 hover:text-red-200"
                      >
                        {resource.emergency}
                      </a>
                    </td>
                    <td className="p-4">
                      <a 
                        href={`https://${resource.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 hover:text-blue-200"
                      >
                        {resource.website}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Immediate Coping Strategies */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Immediate Coping Strategies</h3>
        <div className="glass-card-gradient p-6 rounded-xl">
          <ul className="space-y-3">
            {copingStrategies.map((strategy, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">{index + 1}</span>
                </div>
                <span className="text-gray-300">{strategy}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Safety Plan */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Create a Safety Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card-light p-4 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Person className="text-white" />
              </div>
              <h4 className="text-lg font-bold text-white">Trusted Contacts</h4>
            </div>
            <p className="text-gray-300 text-sm">
              Identify 2-3 people you can reach out to when you're struggling. Save their contact information where you can easily access it.
            </p>
          </div>
          
          <div className="glass-card-light p-4 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <AccessTime className="text-white" />
              </div>
              <h4 className="text-lg font-bold text-white">Distraction Techniques</h4>
            </div>
            <p className="text-gray-300 text-sm">
              Prepare a list of activities that can help distract you during difficult moments (music, exercise, creative hobbies).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyHelp;