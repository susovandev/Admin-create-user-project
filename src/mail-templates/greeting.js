export default function greetingMailTemplate({
	username,
	email,
	password,
	loginUrl,
}) {
	return `
  <!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Login Details</title>
	</head>
	<body
		style="
			margin: 0;
			padding: 0;
			background-color: #f3f4f6;
			font-family: Arial, Helvetica, sans-serif;
		"
	>
		<table width="100%" cellpadding="0" cellspacing="0">
			<tr>
				<td align="center" style="padding: 40px 0">
					<table
						width="100%"
						max-width="600"
						cellpadding="0"
						cellspacing="0"
						style="
							background-color: #ffffff;
							border-radius: 8px;
							box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
							padding: 32px;
						"
					>
						<tr>
							<td>
								<h2
									style="
										margin: 0 0 16px;
										color: #111827;
										font-size: 22px;
									"
								>
									Hello ${username},
								</h2>

								<p
									style="
										margin: 0 0 16px;
										color: #374151;
										font-size: 15px;
										line-height: 1.6;
									"
								>
									Welcome aboard! Here are your login details:
								</p>

								<table
									width="100%"
									cellpadding="0"
									cellspacing="0"
									style="
										background-color: #f9fafb;
										border-radius: 6px;
										padding: 16px;
										margin-bottom: 24px;
									"
								>
									<tr>
										<td
											style="
												color: #111827;
												font-size: 14px;
												padding-bottom: 8px;
											"
										>
											<strong>Email:</strong>
											${email}
										</td>
									</tr>
									<tr>
										<td
											style="
												color: #111827;
												font-size: 14px;
											"
										>
											<strong>Password:</strong> ${password}
										</td>
									</tr>
								</table>

								<div style="text-align: center; margin-bottom: 24px">
									<a
										href="${loginUrl}"
										style="
											background-color: #2563eb;
											color: #ffffff;
											text-decoration: none;
											padding: 12px 24px;
											border-radius: 6px;
											font-size: 14px;
											font-weight: bold;
											display: inline-block;
										"
									>
										Login to Your Account
									</a>
								</div>

								<p
									style="
										margin: 0 0 16px;
										color: #6b7280;
										font-size: 13px;
										line-height: 1.6;
									"
								>
									For security reasons, please change your password
									after your first login.
								</p>

								<p
									style="
										margin: 0;
										color: #6b7280;
										font-size: 13px;
									"
								>
									Best regards,<br />
									<strong>Susovan Das</strong><br />
									Support Team
								</p>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</body>
</html>

  `;
}
