AddEventHandler('playerSpawned', function()
    if isLoadingScreenActive then
        ShutdownLoadingScreenNui()
    end
end)

