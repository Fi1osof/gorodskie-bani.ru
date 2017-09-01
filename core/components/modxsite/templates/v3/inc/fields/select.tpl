{$value = $request.{$properties.name}|default:$properties.defaultValue}

<div class="form-group {if $response.field_errors.{$properties.name}}has-error{/if}">
    <label for="{$properties.name}">{$properties.label}</label>
    
    <select class="form-control {$properties.class}" name="{$properties.name}" id="{$properties.name}" {if $properties.required}required{/if}>
        
        {if $properties.null}
            <option value=''>{$properties.null}</option>
        {/if}
        
        {foreach $properties.options as $v => $option}
            <option value='{$v}' {if $value == $v}selected{/if}>{$option}</option>
        {/foreach}
        
    </select>
     
</div>