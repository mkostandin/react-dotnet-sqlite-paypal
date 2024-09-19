# Use the official .NET 8 SDK image for building the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory
WORKDIR /app

# Copy the project file and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of your application code
COPY . ./

# Build the application
RUN dotnet publish -c Release -o out

# Use the official .NET 8 ASP.NET runtime image for running the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0

# Set the working directory
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build /app/out ./

# Expose port 80
EXPOSE 80

# Start the application
ENTRYPOINT ["dotnet", "backend.dll"]
