import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { ConfirmBox, Button, Icon, Input } from "@codedrops/react-ui";
import "./Notes.scss";

const Notes = ({ notes, setNotes, domainUrl, showDomainInfo }) => {
  const [content, setContent] = useState("");
  const [editNote, setEditNote] = useState(null);

  const addNote = () => {
    if (!content) return;

    setNotes((prev) => [
      ...prev,
      {
        url: domainUrl,
        id: uuid(),
        content,
        createdAt: new Date().toISOString(),
      },
    ]);
    setContent("");
  };

  const setNoteToEdit = (id) => {
    setEditNote({
      id,
      mode: "EDIT",
    });
    const matchedNote = notes.find((item) => item.id === id);
    setContent(matchedNote.content);
  };

  const updateNote = () => {
    const { id } = editNote;
    setNotes((prev) => [
      ...prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            content,
          };
        }
        return item;
      }),
    ]);
    clearNote();
  };

  const clearNote = () => {
    setContent("");
    setEditNote(null);
  };

  const deleteNote = (id) =>
    setNotes((prev) => [...prev.filter((item) => item.id !== id)]);

  return (
    <section>
      <div className="header">
        <span className="flex center">
          <Icon
            onClick={showDomainInfo}
            className="icon home-icon"
            type="home"
          />
          <span>Notes: {domainUrl}</span>
        </span>
        <span>Total: {notes.length}</span>
      </div>
      <div className="list-container">
        {notes.length ? (
          notes.map(({ content, id }, index) => (
            <div
              key={id}
              className={`item${
                editNote && editNote.id === id ? " highlight" : ""
              }`}
            >
              <div className="content">{`${index + 1}. ${content}`}</div>
              <div className="actions">
                {editNote && editNote.id === id ? (
                  <Button size="sm" className="btn" onClick={clearNote}>
                    Cancel
                  </Button>
                ) : (
                  <span className="actionButtons">
                    <Icon
                      onClick={() => setNoteToEdit(id)}
                      className="icon edit-icon"
                      type="edit"
                    />
                    <ConfirmBox onConfirm={() => deleteNote(id)}>
                      <Icon className="icon delete-icon" type="delete" />
                    </ConfirmBox>
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-message">Empty</div>
        )}
      </div>

      <div className="controls">
        <Input
          value={content}
          onChange={(e, value) => setContent(value)}
          className="inputbox"
          placeholder="Enter Note.."
        />
        {editNote && editNote.mode === "EDIT" ? (
          <Button onClick={updateNote} className="btn">
            Update
          </Button>
        ) : (
          <Button onClick={addNote} className="btn">
            Add
          </Button>
        )}
      </div>
    </section>
  );
};

export default Notes;
