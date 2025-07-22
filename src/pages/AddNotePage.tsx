import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { TypographyH1, TypographyP } from "@/components/ui/typography"
import { addNote } from '../utils/local-data';

export default function AddNotePage(): JSX.Element {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !body.trim()) {
      alert('Please fill in both title and body fields.');
      return;
    }

    addNote({ title: title.trim(), body: body.trim() });
    void navigate('/');
  };

  const handleCancel = (): void => {
    void navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-medium">
        <CardContent className="p-4 sm:p-8">
          <div className="mb-6 sm:mb-8">
            <TypographyH1 className="mb-1 sm:mb-2">✏️ Add Note</TypographyH1>
            <TypographyP>Create a new note to capture your thoughts and ideas</TypographyP>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div>
              <label htmlFor="title" className="block text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                📝 Title
              </label>
              <Input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter an engaging title for your note..."
                className="text-lg sm:text-xl font-medium"
                autoFocus
              />
            </div>
            
            <div>
              <label htmlFor="body" className="block text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                📄 Content
              </label>
              <Textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your note content here... Share your thoughts, ideas, or anything you want to remember!"
                rows={10}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="w-full sm:w-auto order-2 sm:order-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-soft hover:shadow-medium order-1 sm:order-2"
              >
                💾 Save Note
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}