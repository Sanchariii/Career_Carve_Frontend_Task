import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBIcon } from 'mdbreact';
import Switch from 'react-switch';


import './ResumeBuilder.css'; // Import the CSS file for styling




const masterSections = [
  { id: 'section1', name: 'Profile Summary', description: 'A summary of your profile', enabled: true ,icon: <MDBIcon fas icon="align-justify" /> },
  { id: 'section2', name: 'Academic and Cocurricular Achievements', description: 'Any awards or honors received', enabled: true,icon: <MDBIcon fas icon="align-justify" /> },
  { id: 'section3', name: 'Summer Internship Experience', description: 'Any internship experiences', enabled: true,icon: <MDBIcon fas icon="align-justify" /> },
  { id: 'section4', name: 'Work Experience', description: 'Your work experience', enabled: true ,icon: <MDBIcon fas icon="align-justify" />},
  { id: 'section5', name: 'Projects', description: 'Your personal or professional projects', enabled: true,icon: <MDBIcon fas icon="align-justify" /> },
  { id: 'section6', name: 'Certifications', description: 'Your certifications and qualifications', enabled: true,icon: <MDBIcon fas icon="align-justify" /> },
  { id: 'section7', name: 'Leadership Positions', description: 'Any leadership qualifications', enabled: true,icon: <MDBIcon fas icon="align-justify" /> },
  { id: 'section8', name: 'Extracurricular', description: 'Any participation in activities other than academical curriculum', enabled: true,icon: <MDBIcon fas icon="align-justify" /> },
  { id: 'section9', name: 'Education', description: 'Your educational background', enabled: true,icon: <MDBIcon fas icon="align-justify" /> },
];

const ResumeBuilder = () => {
  const [sections, setSections] = useState([]);
  const [changed, setChanged] = useState(false);
  const [editSection, setEditSection] = useState(null);

  useEffect(() => {
    setSections(masterSections);
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newSections = Array.from(sections);
    const [movedSection] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, movedSection);

    setSections(newSections);
    setChanged(true);
  };

  const handleEdit = (sectionId) => {
    setEditSection(sectionId);
  };
  const handleDescription = (sectionId) => {
    const section = sections.find((section) => section.id === sectionId);
    if (section) {
      alert(section.description);
    }
  };

  const handleToggle = (sectionId) => {
    const newSections = sections.map((section) => {
      if (section.id === sectionId) {
        return { ...section, enabled: !section.enabled };
      }
      return section;
    });

    setSections(newSections);
    setChanged(true);
  };
  



  const handleSave = () => {
    setChanged(false);
  };

  const handleCancel = () => {
    setSections(masterSections);
    setChanged(false);
  };

  

  return (
    <div className="resume-builder">
      <h1>Select Your Sections</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <ul className="section-list" {...provided.droppableProps} ref={provided.innerRef}>
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided) => (
                    <li
                      className={`section-item ${editSection === section.id ? 'editing' : ''}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <button
                            className="description-button"
                            onClick={() => handleDescription(section.id)}
                          >
                            <MDBIcon icon="info-circle" />
                          </button>
                      <div className="section-content">
                        {editSection === section.id ? (
                          <input
                            type="text"
                            value={section.name}
                            onChange={(e) => {
                              const newSections = sections.map((s) =>
                                s.id === section.id ? { ...s, name: e.target.value } : s
                              );
                              setSections(newSections);
                              setChanged(true);
                            }}
                            onBlur={() => setEditSection(null)}
                           
                          />
                        ) : (
                          <>
                            <span className="section-icon">{section.icon}</span>

                            <span className="section-name">{section.name}</span>
                          </>
                        )}
                        
                        
                        
                        <div className="section-buttons">
                        
                        
                        <button className="edit-button" onClick={() => handleEdit(section.id)}>
                        <MDBIcon icon="fad fa-edit" />
                        
                          </button>
                          <Switch
                            checked={section.enabled}
                            onChange={() => handleToggle(section.id)}
                            onColor="#A020F0"
                            onHandleColor="#003153"
                            handleDiameter={20}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            height={12}
                            width={40}
                            className="toggle-switch"
                          />
                          
                        </div>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div className="footer">
        <div className={`button-group ${!changed ? 'disabled' : ''}`}>
        <button
            className={`save-next-button ${!changed ? 'disabled' : ''}`}
            onClick={handleSave}
            disabled={!changed}
          >
            
              Save and Next
            
            
          </button>
          
        </div>
        </div>
     
    </div>
  );
};

export default ResumeBuilder;
