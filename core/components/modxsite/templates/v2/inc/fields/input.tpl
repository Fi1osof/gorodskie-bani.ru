<div class="form-group {if $response.field_errors.{$properties.name}}has-error{/if}">
    <label for="{$properties.name}">{$properties.label}</label>
    <input 
        type="{$propeties.type|default:'text'}" 
        class="form-control" 
        name="{$properties.name}" 
        id="{$properties.name}" 
        placeholder="{$properties.ph}" 
        value="{$request.{$properties.name}|default:$properties.defaultValue}" 
        {if $properties.required}required{/if}
        {if $properties.disabled}disabled{/if}
    >
</div>