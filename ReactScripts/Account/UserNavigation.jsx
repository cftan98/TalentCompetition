export const userNavigation = (userRole) => {
    if (userRole != null)
        userRole = userRole.toLowerCase();
    if (userRole == "talent")
        return "/TalentProfile"
    else if (userRole == "employer")
        return "/EmployerProfile"
    else if (userRole == "recruiter")
        return "/EmployerProfile"
    else
        return "/Home"
}