import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { generateQRCodeData, QRCodeOptions } from '@/lib/qr-code-generator';

interface QRCodeSectionProps {
  password: string;
}

export function QRCodeSection({ password: initialPassword }: QRCodeSectionProps) {
  const [password, setPassword] = useState(initialPassword);
  const [options, setOptions] = useState<QRCodeOptions>({
    size: 200,
    level: 'M',
    encrypted: false,
    expiresIn: 0
  });
  
  const [qrData, setQrData] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  
  // Update password when initialPassword changes
  React.useEffect(() => {
    setPassword(initialPassword);
  }, [initialPassword]);
  
  // Generate QR code
  const generateQRCode = () => {
    if (!password) return;
    
    const { data, expiresAt } = generateQRCodeData(password, options);
    setQrData(data);
    setExpiresAt(expiresAt);
  };
  
  // Download QR code as SVG
  const downloadQRCode = () => {
    if (!qrData) return;
    
    const svg = document.getElementById('password-qr-code');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'password-qr-code.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  
  // Format expiration time
  const formatExpirationTime = () => {
    if (!expiresAt) return 'No expiration';
    
    const now = new Date();
    const diffMs = expiresAt.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins <= 0) return 'Expired';
    if (diffMins < 60) return `Expires in ${diffMins} minute(s)`;
    
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `Expires in ${hours} hour(s) and ${mins} minute(s)`;
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-primary">QR Code Generator</CardTitle>
        <CardDescription>
          Create a QR code for your password that can be scanned by another device
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="qr-password">Password</Label>
            <Input
              id="qr-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter or paste a password"
              type="text"
            />
            <p className="text-sm text-gray-500">
              Enter the password you want to encode in the QR code
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="qr-size">QR Code Size</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  id="qr-size"
                  min={100}
                  max={400}
                  step={10}
                  value={[options.size]}
                  onValueChange={(value) => setOptions({ ...options, size: value[0] })}
                />
                <span className="w-12 text-sm text-right">{options.size}px</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="qr-level">Error Correction</Label>
              <Select
                value={options.level}
                onValueChange={(value) => setOptions({ ...options, level: value as 'L' | 'M' | 'Q' | 'H' })}
              >
                <SelectTrigger id="qr-level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Low (7%)</SelectItem>
                  <SelectItem value="M">Medium (15%)</SelectItem>
                  <SelectItem value="Q">Quartile (25%)</SelectItem>
                  <SelectItem value="H">High (30%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="encrypted"
                checked={options.encrypted}
                onCheckedChange={(checked) => setOptions({ ...options, encrypted: checked })}
              />
              <Label htmlFor="encrypted">Encrypt QR Code</Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expiration">Expiration Time (minutes)</Label>
              <Select
                value={options.expiresIn?.toString() || "0"}
                onValueChange={(value) => setOptions({ ...options, expiresIn: parseInt(value) })}
              >
                <SelectTrigger id="expiration">
                  <SelectValue placeholder="Select expiration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No expiration</SelectItem>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="1440">24 hours</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm text-gray-500">
                After this time, the QR code will no longer work
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button
                onClick={generateQRCode}
                disabled={!password}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Generate QR Code
              </Button>
              
              <Button
                onClick={downloadQRCode}
                disabled={!qrData}
                variant="outline"
                className="flex-1 text-primary border-primary hover:bg-primary/10"
              >
                Download QR Code
              </Button>
            </div>
          </div>
          
          <div className="space-y-4 w-full">
            {qrData && (
              <div className="space-y-4">
                <div className="border rounded-md p-4 bg-white flex justify-center">
                  <QRCodeSVG
                    id="password-qr-code"
                    value={qrData}
                    size={options.size}
                    level={options.level as any}
                    includeMargin={true}
                  />
                </div>
                
                {expiresAt && (
                  <div className="text-sm text-gray-500 text-left w-full">
                    {formatExpirationTime()}
                  </div>
                )}
                
                <div className="flex space-x-2 justify-center w-full">
                  <Button onClick={downloadQRCode} className="flex-1">
                    Download QR Code
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="text-sm text-gray-500 flex flex-col items-start">
        <p>
          <strong>Encryption:</strong> When enabled, the QR code content is encrypted with AES encryption. 
          The decryption key is included in the QR code itself, making it safe for temporary sharing.
        </p>
        <p className="mt-1">
          <strong>Expiration:</strong> When set, the QR code will stop working after the specified time period.
          This adds an extra layer of security for sensitive passwords.
        </p>
      </CardFooter>
    </Card>
  );
}
