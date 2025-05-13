
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Paperclip, Send, Trash, Upload, Globe } from "lucide-react";
import { toast } from "sonner";

type Message = {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  attachments?: { name: string; type: string }[];
};

const mockAssistantResponses: { [key: string]: string } = {
  "hello": "Hello! How can I assist you with your legal research today?",
  "case": "I can help you analyze case documents. Would you like to upload a document for me to review?",
  "law": "I can provide information about specific laws and regulations. Could you specify which area of law you're interested in?",
  "upload": "You can upload documents using the attachment button below the message input.",
  "help": "I can assist with case research, document analysis, finding relevant precedents, and multilingual document translation.",
};

const LegalChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Welcome to JusticeFlow Legal Assistant. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!input.trim() && files.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
      attachments: files.map(file => ({ name: file.name, type: file.type })),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Process files if any
    if (files.length > 0) {
      setIsProcessing(true);
      setTimeout(() => {
        const fileResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: `I've received ${files.length} document(s). I'll analyze them and provide insights shortly.`,
          sender: "assistant",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, fileResponse]);
        setFiles([]);
        setIsProcessing(false);
      }, 1500);
    }

    // Mock response based on input keywords
    setTimeout(() => {
      let responseContent = "I'm sorry, I don't have enough information to assist with that. Could you provide more details?";
      
      const inputLower = input.toLowerCase();
      
      for (const [keyword, response] of Object.entries(mockAssistantResponses)) {
        if (inputLower.includes(keyword)) {
          responseContent = response;
          break;
        }
      }

      if (inputLower.includes("precedent") || inputLower.includes("similar case")) {
        responseContent = "Based on the information provided, I found 3 potentially relevant precedents. Would you like me to summarize them?";
      } else if (inputLower.includes("translate") || inputLower.includes("language")) {
        responseContent = "I can translate documents or text into multiple languages. Which language would you like to translate to?";
      }

      const assistantMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: responseContent,
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      toast.success(`${newFiles.length} file(s) added`);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-center">
          Legal Research Assistant
          <Badge variant="outline" className="ml-2">AI Powered</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-[420px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {message.attachments.map((file, index) => (
                        <div key={index} className="flex items-center text-xs bg-background/10 rounded p-1">
                          <Paperclip className="h-3 w-3 mr-1" />
                          <span className="truncate">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <div className="px-4 py-2">
        {files.length > 0 && (
          <div className="mb-2 bg-muted p-2 rounded-md">
            <p className="text-xs font-medium mb-1">Attachments</p>
            <div className="flex flex-wrap gap-1">
              {files.map((file, index) => (
                <div 
                  key={index} 
                  className="flex items-center text-xs bg-background rounded p-1 pr-2"
                >
                  <Paperclip className="h-3 w-3 mr-1" />
                  <span className="truncate max-w-[150px]">{file.name}</span>
                  <button 
                    onClick={() => removeFile(index)}
                    className="ml-1 text-muted-foreground hover:text-destructive"
                  >
                    <Trash className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <CardFooter className="border-t pt-3">
        <div className="flex items-end w-full space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="shrink-0"
            onClick={triggerFileUpload}
          >
            <Upload className="h-4 w-4" />
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt"
            />
          </Button>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your legal question..."
            className="min-h-[40px] flex-1"
          />
          <Button 
            className="shrink-0" 
            onClick={handleSend}
            disabled={isProcessing || (!input.trim() && files.length === 0)}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LegalChatbot;
