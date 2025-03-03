import { useCallback, useMemo, useState } from 'react';
import SimpleMdeReact from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

interface MarkdownEditorProps {
    initialValue?: string;
    onChange?: (value: string) => void;
    autoSave?: boolean;
    autoSaveDelay?: number;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
    initialValue = '',
    onChange,
    autoSave = false,
    autoSaveDelay = 1000,
}) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = useCallback(
        (newValue: string) => {
            setValue(newValue);
            onChange?.(newValue); // Call the parent's onChange if provided
        },
        [onChange]
    );

    // Options for the editor
    const editorOptions = useMemo(() => {
        if (autoSave) {
            return {
                autosave: {
                    enabled: true,
                    uniqueId: 'markdown_editor',
                    delay: autoSaveDelay,
                },
            };
        }
        return {};
    }, [autoSave, autoSaveDelay]);

    return (
        <div className="markdown-editor rtl:text-right prose dark:prose-invert">
            <SimpleMdeReact value={value} onChange={handleChange} options={editorOptions} />
        </div>
    );
};

export default MarkdownEditor;
