<div class="form-group {if $response.field_errors.{$properties.name}}has-error{/if}">
    <label for="{$properties.name}">{$properties.label}</label>
    
    <textarea class="form-control" rows="2" style="resize:vertical" 
        placeholder="{$properties.ph}"
        name="{$properties.name}"
        id="{$properties.name}"
        {if $properties.required}required{/if}
    >{$request.{$properties.name}|default:$properties.defaultValue}</textarea>
</div>