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
import { useTranslations } from 'next-intl';

interface QRCodeSectionProps {
  password: string;
}

export function QRCodeSection({ password: initialPassword }: QRCodeSectionProps) {
  const t = useTranslations();
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
    if (!expiresAt) return t('noExpiration');
    
    const now = new Date();
    const diffMs = expiresAt.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins <= 0) return t('expired');
    if (diffMins < 60) return `${t('expires')} ${diffMins} ${t('minutes')}`;
    
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `${t('expires')} ${hours} ${hours === 1 ? t('hour') : t('hours')} ${t('and')} ${mins} ${t('minutes')}`;
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-primary">{t('qrCodeGenerator')}</CardTitle>
        <CardDescription>
          {t('qrCodeDescription')}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="qr-password">{t('password')}</Label>
            <Input
              id="qr-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('enterOrGeneratePassword')}
              type="text"
            />
            <p className="text-sm text-gray-500">
              {t('enterPasswordForQR')}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="qr-size">{t('qrCodeSize')}</Label>
                <span className="text-sm text-gray-500">{options.size}px</span>
              </div>
              <Slider
                id="qr-size"
                min={100}
                max={400}
                step={10}
                value={[options.size || 200]}
                onValueChange={(value) => setOptions({ ...options, size: value[0] })}
                className="w-full mobile-slider-container"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="qr-level">{t('errorCorrection')}</Label>
              <Select
                value={options.level}
                onValueChange={(value) => setOptions({ ...options, level: value as 'L' | 'M' | 'Q' | 'H' })}
              >
                <SelectTrigger id="qr-level">
                  <SelectValue placeholder={t('errorCorrection')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">{t('low')} (7%)</SelectItem>
                  <SelectItem value="M">{t('medium')} (15%)</SelectItem>
                  <SelectItem value="Q">{t('quartile')} (25%)</SelectItem>
                  <SelectItem value="H">{t('high')} (30%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="switch-container">
              <Switch
                id="encrypted"
                checked={options.encrypted}
                onCheckedChange={(checked) => setOptions({ ...options, encrypted: checked })}
              />
              <Label htmlFor="encrypted">{t('encryptQRCode')}</Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expiration">{t('expirationTime')}</Label>
              <Select
                value={options.expiresIn?.toString() || "0"}
                onValueChange={(value) => setOptions({ ...options, expiresIn: parseInt(value) })}
              >
                <SelectTrigger id="expiration">
                  <SelectValue placeholder={t('expirationTime')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">{t('noExpiration')}</SelectItem>
                  <SelectItem value="5">5 {t('minutes')}</SelectItem>
                  <SelectItem value="15">15 {t('minutes')}</SelectItem>
                  <SelectItem value="30">30 {t('minutes')}</SelectItem>
                  <SelectItem value="60">1 {t('hour')}</SelectItem>
                  <SelectItem value="120">2 {t('hours')}</SelectItem>
                  <SelectItem value="1440">24 {t('hours')}</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm text-gray-500">
                {t('expirationNote')}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button
                onClick={generateQRCode}
                disabled={!password}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {t('generateQRCode')}
              </Button>
              
              <Button
                onClick={downloadQRCode}
                disabled={!qrData}
                variant="outline"
                className="flex-1 text-primary border-primary hover:bg-primary/10"
              >
                {t('downloadQRCode')}
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
                  <div className="text-sm text-gray-500 text-center w-full">
                    {formatExpirationTime()}
                  </div>
                )}
                
                <div className="flex space-x-2 justify-center w-full">
                  <Button onClick={downloadQRCode} className="flex-1 text-center">
                    {t('downloadQRCode')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="text-sm text-gray-500 flex flex-col items-start">
        <p>
          <strong>{t('encryption')}:</strong> {t('encryptionDescription')}
        </p>
        <p className="mt-1">
          <strong>{t('expiration')}:</strong> {t('expirationDescription')}
        </p>
      </CardFooter>
    </Card>
  );
}
