using Backend.Entity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace Backend.Infrastructure
{
    public class Authentication
    {

        public static string GenerateToken(UserEntity user)
        {
            var key = Encoding.ASCII.GetBytes(Configuration.JWTSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public static string GetClaimValueFromToken(HttpContext httpContext, string claimType)
        {
            var identity = httpContext.User.Identity as ClaimsIdentity;
            switch (claimType)
            {
                case ClaimTypes.Email:
                    string? email = identity?.FindFirst(ClaimTypes.Email)?.Value;
                    if (string.IsNullOrEmpty(email)) { throw new Exception("Token Inválido."); }
                    return email;
                default:
                    throw new Exception("Claim Inválido.");
            }
        }
    }
}
