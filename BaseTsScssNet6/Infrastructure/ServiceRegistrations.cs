using Microsoft.Extensions.Options;
using BaseTsScssNet6.Infrastructure.Options;

namespace BaseTsScssNet6.Infrastructure
{
    public static class ServiceRegistrations
    {
        public static IServiceCollection AddServiceRegistrations(this IServiceCollection services, IConfiguration configuration)
        {
            return services
                .AddHttpContextAccessor()
                .AddApiOptions(configuration)
                .AddLogicServices(configuration)
                .AddValidators();
        }

        private static IServiceCollection AddApiOptions(this IServiceCollection services, IConfiguration configuration)
        {
            if (configuration != null)
            {
                //services.AddOptions<AppOptions>().Bind(configuration.GetSection(AppOptions.AppOptionsName));
            }

            return services;
        }

        private static IServiceCollection AddLogicServices(this IServiceCollection services, IConfiguration configuration)
        {

            //services.AddHttpClient<IMyService, IMyService>(ConfigureDefaultHttpClient);
            return services;
        }

        private static IServiceCollection AddValidators(this IServiceCollection services)
        {
            //services.AddTransient<IValidator<MyViewModel>, MyViewReportValidator>();
            return services;
        }

        private static void ConfigureDefaultHttpClient(IServiceProvider provider, HttpClient client)
        {
            var apiSettings = provider.GetRequiredService<IOptions<AppOptions>>().Value;

            ConfigureDefaultInternalApimHttpClient(provider, client, apiSettings);

            Uri GetUri = new Uri(apiSettings.ApiUrl + "/");

            client.BaseAddress = GetUri;
        }

        private static void ConfigureDefaultInternalApimHttpClient(IServiceProvider provider, HttpClient client, AppOptions apiSettings)
        {
            // var authService = provider.GetRequiredService<IAuthenticationService>();
            // var keyVaultSettings = provider.GetRequiredService<IOptions<KeyVaultSettings>>().Value;

            var httpContext = provider.GetRequiredService<IHttpContextAccessor>();
            //var authHeader = authService.GetAuthenticationHeaderAsync(httpContext.HttpContext.RequestAborted).Result.ToString();

            //client.DefaultRequestHeaders.Add(apiSettings.AuthorizationHeader, authHeader);
            //client.DefaultRequestHeaders.Add(apiSettings.ApimSubscriptionKey, keyVaultSettings.ApimInternalClientsSubscription);
        }
    }
}
