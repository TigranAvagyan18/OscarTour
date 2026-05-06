export const passwordChangedEmailTemplate = (): string => {
	return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Changed Successfully</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(232, 40, 140, 0.08); overflow: hidden;">
                    <tr>
                        <td style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 48px 40px; text-align: center;">
                            <div style="width: 80px; height: 80px; margin: 0 auto 24px; border-radius: 12px; background-color: rgba(255, 255, 255, 0.95); display: flex; align-items: center; justify-content: center;">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Password Changed</h1>
                        </td>
                    </tr>
                    
                    <tr>
                        <td style="padding: 48px 40px;">
                            <p style="margin: 0 0 24px; color: #333333; font-size: 16px; line-height: 1.6;">
                                Hello!
                            </p>
                            <p style="margin: 0 0 32px; color: #666666; font-size: 16px; line-height: 1.6;">
                                This email confirms that your password for your FlowerFinder account has been successfully changed.
                            </p>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F0FDF4; border-left: 4px solid #10B981; border-radius: 8px; margin-bottom: 32px;">
                                <tr>
                                    <td style="padding: 20px 24px;">
                                        <p style="margin: 0 0 8px; color: #333333; font-size: 14px; font-weight: 600;">
                                            ✓ Your password is secure
                                        </p>
                                        <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.5;">
                                            You can now use your new password to sign in to your FlowerFinder account on all devices.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #FEF2F2; border-left: 4px solid #EF4444; border-radius: 8px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 20px 24px;">
                                        <p style="margin: 0 0 8px; color: #333333; font-size: 14px; font-weight: 600;">
                                            🔒 Didn't make this change?
                                        </p>
                                        <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.5;">
                                            If you didn't change your password, please contact our support team immediately at <a href="mailto:support@flowerfinder.be" style="color: #EF4444; text-decoration: none; font-weight: 600;">support@flowerfinder.be</a>. Your account security is important to us.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 0 0 16px; color: #666666; font-size: 14px; line-height: 1.6;">
                                <strong>Security Tips:</strong>
                            </p>
                            <ul style="margin: 0 0 24px; padding-left: 20px; color: #666666; font-size: 14px; line-height: 1.8;">
                                <li>Use a unique password for your FlowerFinder account</li>
                                <li>Never share your password with anyone</li>
                                <li>Enable two-factor authentication when available</li>
                                <li>Change your password regularly</li>
                            </ul>
                            
                            <p style="margin: 0; color: #999999; font-size: 14px; line-height: 1.6;">
                                Thank you for helping us keep your account secure!
                            </p>
                        </td>
                    </tr>
                    
                    <tr>
                        <td style="background-color: #FAFAFA; padding: 32px 40px; border-top: 1px solid #F0F0F0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="text-align: center;">
                                        <p style="margin: 0 0 8px; color: #999999; font-size: 13px;">
                                            Need help? Contact us at <a href="mailto:support@flowerfinder.be" style="color: #E8288C; text-decoration: none; font-weight: 600;">support@flowerfinder.be</a>
                                        </p>
                                        <p style="margin: 0; color: #CCCCCC; font-size: 12px;">
                                            &copy; 2026 FlowerFinder. All rights reserved.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 24px auto 0;">
                    <tr>
                        <td style="text-align: center; padding: 0 20px;">
                            <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.5;">
                                This is an automated security notification from FlowerFinder.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
};
